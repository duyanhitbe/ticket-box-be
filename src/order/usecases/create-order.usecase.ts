import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { CreateOrderEventPayload, ENUM_ORDER_STATUS, OrderRepository } from '@lib/modules/order';
import { CreateOrderDetailDto, OrderDetailTypeormEntity } from '@lib/modules/order-detail';
import { TicketTypeormEntity } from '@lib/modules/ticket';
import {
	TicketInfoByIdsEntity,
	TicketInfoRepository,
	TicketInfoTypeormEntity
} from '@lib/modules/ticket-info';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In, IsNull, QueryRunner } from 'typeorm';
import {
	ENUM_RABBITMQ_CLIENT,
	InjectClientRMQ,
	RABBITMQ_PATTERNS,
	RMQClientProxy
} from '@lib/core/rabbitmq';
import { SendMailOrderEventPayload } from '@lib/modules/mail'; // totalPrice

// totalPrice

@Injectable()
export class CreateOrderUseCase extends ExecuteHandler<any> {
	constructor(
		@InjectDataSource()
		private readonly dataSource: DataSource,
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.MAIL)
		private readonly mailClient: RMQClientProxy,
		private readonly orderRepository: OrderRepository,
		private readonly customerRepository: CustomerRepository,
		private readonly ticketInfoRepository: TicketInfoRepository
	) {
		super();
	}

	async execute(data: CreateOrderEventPayload) {
		const { orderId, orderCode, user, details, date } = data;
		const agencyLevelId = user?.agencyLevelId;

		//Lấy thông tin khách hàng
		const customer = await this.getCustomer(data, agencyLevelId);
		const customerId = customer.id;
		const customerName = customer.name;
		const customerPhone = customer.phone;
		const customerEmail = customer.email;

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.startTransaction();

		let eventId: string | null = null;
		let eventName: string | null = null;
		let totalPrice = 0;

		try {
			//Lấy danh sách thông tin vé kèm giá theo role của customer
			const ticketInfoIds = details.map((detail) => detail.ticketInfoId);
			const ticketInfos = await this.ticketInfoRepository.findAllWithPriceByIds(
				ticketInfoIds,
				queryRunner,
				agencyLevelId
			);
			eventId = ticketInfos[0].eventId;
			eventName = ticketInfos[0].eventName;

			//Validate dữ liệu
			const [mappedDetails] = await Promise.all([
				this.validateQuantity(ticketInfos, details),
				this.validateTicketLength(ticketInfos, ticketInfoIds),
				this.validateEventId(ticketInfos)
			]);

			//Create order details
			totalPrice = await this.createDetails(
				orderId,
				customerId,
				date,
				mappedDetails,
				queryRunner
			);

			await queryRunner.commitTransaction();
			const sendMailPayload: SendMailOrderEventPayload = {
				orderCode,
				totalPrice,
				customerName,
				customerEmail,
				orderStatus: ENUM_ORDER_STATUS.RESERVED,
				details: mappedDetails.map(({ name, quantity, discountedPrice }) => ({
					name,
					quantity,
					price: discountedPrice,
					totalPrice: discountedPrice * quantity
				}))
			};
			this.mailClient.emit(RABBITMQ_PATTERNS.SEND_MAIL_ORDER, sendMailPayload);
		} catch (err) {
			this.logger.error(err.message);
			await queryRunner.rollbackTransaction();
			const sendMailPayload: SendMailOrderEventPayload = {
				orderCode,
				customerName,
				customerEmail,
				orderStatus: ENUM_ORDER_STATUS.CANCELLED,
				reason: err.message
			};
			this.mailClient.emit(RABBITMQ_PATTERNS.SEND_MAIL_ORDER, sendMailPayload);
			return this.orderRepository.updateById({
				id: orderId,
				data: {
					orderStatus: ENUM_ORDER_STATUS.CANCELLED,
					reason: err.message,
					eventId,
					eventName,
					customerId,
					customerName,
					customerPhone,
					customerEmail
				}
			});
		} finally {
			await queryRunner.release();
		}

		await this.orderRepository.updateOrderById(orderId, {
			eventId,
			eventName,
			customerId,
			customerName,
			customerPhone,
			customerEmail,
			totalPrice,
			orderStatus: ENUM_ORDER_STATUS.RESERVED
		});
	}

	//Lấy hoặc tạo khách hàng
	private async getCustomer(data: CreateOrderEventPayload, agencyLevelId?: string) {
		const { customerName, customerPhone, customerEmail } = data;

		let customer: CustomerEntity | null = null;
		try {
			customer = await this.customerRepository.getCustomerForCreateOrder({
				name: customerName,
				phone: customerPhone,
				email: customerEmail,
				agencyLevelId
			});
		} catch (err) {
			this.logger.error(err.message);
			throw new Error('Lỗi dữ liệu người dùng');
		}
		if (!customer) {
			this.logger.error('Customer is null');
			throw new Error('Lỗi dữ liệu người dùng');
		}

		return customer;
	}

	//Kiểm tra thông tin vé trả về có khớp với vé truyền lên hay không (Không cho phép trùng)
	private async validateTicketLength(
		ticketInfos: TicketInfoByIdsEntity[],
		ticketInfoIds: string[]
	) {
		if (ticketInfos.length !== ticketInfoIds.length) {
			this.logger.error('TicketInfo length is not match');
			this.logger.debug({
				ticketInfosLength: ticketInfos.length,
				ticketInfoIdsLength: ticketInfoIds.length,
				ticketInfoIds
			});
			throw new Error('Thông tin vé không chính xác');
		}
	}

	//Kiểm tra xem người dùng có mua vé từ 2 sự kiện cùng lúc hay không
	private async validateEventId(ticketInfos: TicketInfoByIdsEntity[]) {
		const isValidEventId = ticketInfos.every(
			({ eventId }) => eventId === ticketInfos[0].eventId
		);
		if (!isValidEventId) {
			this.logger.error('More than 1 eventId');
			this.logger.debug({ isValidEventId });
			throw new Error('Không thể mua 2 của 2 sự kiện cùng lúc');
		}
	}

	//Kiểm tra số lượng vé còn đủ không
	private async validateQuantity(
		ticketInfos: TicketInfoByIdsEntity[],
		details: CreateOrderDetailDto[]
	) {
		const mapQuantity: Record<string, number> = details.reduce(
			(prev, { ticketInfoId, quantity }) => {
				return {
					...prev,
					[ticketInfoId]: quantity
				};
			},
			{}
		);
		const mappedTicketInfos: TicketInfoByIdsEntity[] = [];
		for (const ticketInfo of ticketInfos) {
			const id = ticketInfo.id;
			const actual = ticketInfo.quantity;
			const expected = mapQuantity[id];
			if (actual < expected) {
				this.logger.error('Do not enough ticket');
				this.logger.debug({ actual, expected });
				throw new Error('Số lượng vé không đủ');
			}
			mappedTicketInfos.push({
				...ticketInfo,
				quantity: expected
			});
		}
		const isValidQuantity = ticketInfos.every(
			({ id, quantity }) => quantity >= mapQuantity[id]
		);
		if (!isValidQuantity) {
			this.logger.error('Do not enough ticket');
			this.logger.debug({ isValidQuantity });
			throw new Error('Số lượng vé không đủ');
		}
		return mappedTicketInfos;
	}

	//Tạo đơn hàng chi tiết + cập nhật vé
	private async createDetails(
		orderId: string,
		customerId: string,
		date: Date,
		mappedTicketInfos: TicketInfoByIdsEntity[],
		queryRunner: QueryRunner
	) {
		let orderTotalPrice = 0;

		for (const ticketInfo of mappedTicketInfos) {
			const {
				id: ticketInfoId,
				eventId,
				ticketGroupId,
				quantity,
				name: ticketName,
				basePrice: ticketBasePrice,
				discountType: ticketDiscountType,
				discountValue: ticketDiscountValue,
				discountedPrice: ticketDiscountedPrice
			} = ticketInfo;

			//Find ticket with orderId = null
			const tickets = await queryRunner.manager.find(TicketTypeormEntity, {
				where: {
					eventId,
					ticketGroupId,
					ticketInfoId,
					orderId: IsNull(),
					customerId: IsNull()
				},
				take: quantity,
				select: ['id']
			});
			if (tickets.length < quantity) {
				throw new Error('Số lượng vé không đủ');
			}

			//Create order detail
			const totalPrice = ticketDiscountedPrice * quantity;
			await queryRunner.manager
				.create(OrderDetailTypeormEntity, {
					orderId,
					ticketGroupId,
					ticketName,
					ticketBasePrice,
					ticketDiscountType,
					ticketDiscountValue,
					ticketDiscountedPrice,
					quantity,
					totalPrice
				})
				.save({ transaction: false });

			//Update ticket
			const ticketIds = tickets.map((item) => item.id);
			await queryRunner.manager.update(
				TicketTypeormEntity,
				{ id: In(ticketIds) },
				{
					orderId,
					customerId,
					basePrice: ticketBasePrice,
					discountType: ticketDiscountType,
					discountValue: ticketDiscountValue,
					discountedPrice: ticketDiscountedPrice,
					useAt: date
				}
			);

			//Update ticket info
			await queryRunner.manager.decrement(
				TicketInfoTypeormEntity,
				{
					id: ticketInfoId
				},
				'quantity',
				quantity
			);

			orderTotalPrice += totalPrice;
		}

		return orderTotalPrice;
	}
}
