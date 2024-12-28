import { Injectable } from '@nestjs/common';
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

@Injectable()
export class PlaceOrderUseCase extends ExecuteHandler<Promise<OrderCreatedEntity>> {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.ORDER)
		private readonly orderClient: RabbitmqService,
		private readonly orderRepository: OrderRepository
	) {
		super();
	}

	async execute(data: CreateOrderDto, user: RequestUser): Promise<OrderCreatedEntity> {
		const { paymentMethod, note, cardName, cardId } = data;

		const order = await this.orderRepository.create({
			data: {
				paymentMethod,
				note,
				cardName,
				cardId
			},
			returning: ['id', 'code']
		});

		const payload: CreateOrderEventPayload = {
			orderId: order.id,
			user,
			...data
		};
		this.orderClient.emit(RABBITMQ_PATTERNS.CREATE_ORDER, payload);

		return {
			id: order.id,
			paymentMethod: order.paymentMethod
		};
	}
}
