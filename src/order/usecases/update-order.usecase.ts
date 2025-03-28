import { Injectable } from '@nestjs/common';
import {
	CancelOrderEventPayload,
	ENUM_ORDER_STATUS,
	OrderEntity,
	OrderRepository,
	OrderUpdatedEntity,
	UpdateOrderDto
} from '@lib/modules/order';
import { ExecuteHandler } from '@lib/common/abstracts';
import {
	ENUM_RABBITMQ_CLIENT,
	InjectClientRMQ,
	RABBITMQ_PATTERNS,
	RMQClientProxy
} from '@lib/core/rabbitmq';
import { SendMailOrderEventPayload } from '@lib/modules/mail';

@Injectable()
export class UpdateOrderUseCase extends ExecuteHandler<OrderUpdatedEntity> {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.MAIL)
		private readonly mailClient: RMQClientProxy,
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.ORDER)
		private readonly orderClient: RMQClientProxy,
		private readonly orderRepository: OrderRepository
	) {
		super();
	}

	async execute(id: string, data: UpdateOrderDto): Promise<OrderUpdatedEntity> {
		const order = await this.orderRepository.updateById({ id, data, relations: ['details'] });
		this.emitEvent(order);
		return {
			id: order.id,
			orderStatus: order.orderStatus,
			reason: order.reason
		};
	}

	private emitEvent(order: OrderEntity) {
		if (order.orderStatus !== ENUM_ORDER_STATUS.RESERVED) {
			const eventPayload: SendMailOrderEventPayload = {
				orderCode: order.code,
				customerName: order.customerName!,
				customerEmail: order.customerEmail!,
				orderStatus: order.orderStatus!,
				totalPrice: order.totalPrice!,
				details: order.details?.map(({ ticketName, quantity, ticketDiscountedPrice }) => ({
					name: ticketName,
					quantity,
					price: ticketDiscountedPrice,
					totalPrice: ticketDiscountedPrice * quantity
				}))
			};
			this.mailClient.emit(RABBITMQ_PATTERNS.SEND_MAIL_ORDER, eventPayload);
		}
		if (order.orderStatus === ENUM_ORDER_STATUS.CANCELLED) {
			const payload: CancelOrderEventPayload = {
				orderId: order.id
			};
			this.orderClient.emit(RABBITMQ_PATTERNS.CANCEL_ORDER, payload);
		}
	}
}
