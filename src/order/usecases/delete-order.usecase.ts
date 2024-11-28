import { Injectable } from '@nestjs/common';
import { OrderEntity, OrderRepository } from '@lib/modules/order';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteOrderUseCase extends ExecuteHandler<OrderEntity> {
	constructor(private readonly orderRepository: OrderRepository) {
		super();
	}

	async execute(id: string): Promise<OrderEntity> {
		return this.orderRepository.softDeleteById({ id });
	}
}
