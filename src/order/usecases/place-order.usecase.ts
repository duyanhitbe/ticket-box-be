import { BadRequestException, Injectable } from '@nestjs/common';
import { ExecuteHandler } from '@lib/common/abstracts';
import { ENUM_RABBITMQ_CLIENT, InjectClientRMQ, RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { RabbitmqService } from '@lib/core/rabbitmq/rabbitmq.service.abstract';
import {
	CreateOrderDto,
	CreateOrderEventPayload,
	OrderCreatedEntity,
	OrderRepository
} from '@lib/modules/order';
import { RequestUser } from '@lib/common/interfaces';
import { CreateOrderDetailDto } from '@lib/modules/order-detail';
import { TicketInfoRepository } from '@lib/modules/ticket-info';

@Injectable()
export class PlaceOrderUseCase extends ExecuteHandler<Promise<OrderCreatedEntity>> {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.ORDER)
		private readonly orderClient: RabbitmqService,
		private readonly orderRepository: OrderRepository,
		private readonly ticketInfoRepository: TicketInfoRepository
	) {
		super();
	}

	async execute(data: CreateOrderDto, user: RequestUser): Promise<OrderCreatedEntity> {
		const { paymentMethod, note, details } = data;

		await this.validateQuantity(details);

		const order = await this.orderRepository.create({
			data: {
				paymentMethod,
				note
			},
			returning: ['id', 'code']
		});

		const payload: CreateOrderEventPayload = {
			orderId: order.id,
			orderCode: order.code,
			user,
			...data
		};
		this.orderClient.emit(RABBITMQ_PATTERNS.CREATE_ORDER, payload);

		return {
			id: order.id,
			paymentMethod: order.paymentMethod
		};
	}

	private async validateQuantity(details: CreateOrderDetailDto[]) {
		await Promise.all(
			details.map(async ({ ticketInfoId, quantity }) => {
				const ticketInfo = await this.ticketInfoRepository.findByIdOrThrow({
					id: ticketInfoId
				});
				if (ticketInfo.quantity < quantity) {
					throw new BadRequestException('Số lượng vé không đủ');
				}
			})
		);
	}
}
