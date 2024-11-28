import { Injectable } from '@nestjs/common';
import { OrderEntity, OrderRepository } from '@lib/modules/order';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailOrderUseCase extends QueryHandler<OrderEntity> {
	constructor(private readonly orderRepository: OrderRepository) {
		super();
	}

	async query(id: string): Promise<OrderEntity> {
		return this.orderRepository.findByIdOrThrow({ id });
	}
}
