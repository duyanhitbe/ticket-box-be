import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderEntity, OrderRepository } from '@lib/modules/order';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateOrderUseCase extends ExecuteHandler<OrderEntity> {
	constructor(private readonly orderRepository: OrderRepository) {
		super();
	}

	async execute(data: CreateOrderDto): Promise<OrderEntity> {
		return this.orderRepository.create({ data });
	}
}
