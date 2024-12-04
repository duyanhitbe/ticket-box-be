import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderCreatedEntity, OrderRepository } from '@lib/modules/order';
import { ExecuteHandler } from '@lib/common/abstracts';
import { v4 as uuid } from 'uuid';
import { ENUM_RABBITMQ_CLIENT, InjectClientRMQ, RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { RabbitmqService } from '@lib/core/rabbitmq/rabbitmq.service.abstract';

@Injectable()
export class CreateOrderUseCase extends ExecuteHandler<OrderCreatedEntity> {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.ORDER)
		private readonly orderClient: RabbitmqService,
		private readonly orderRepository: OrderRepository
	) {
		super();
	}

	async execute(data: CreateOrderDto): Promise<OrderCreatedEntity> {
		const { paymentMethod } = data;
		const id = uuid();

		this.orderClient.emit(RABBITMQ_PATTERNS.CREATE_ORDER, {
			id,
			...data
		});

		return {
			id,
			paymentMethod
		};
	}
}
