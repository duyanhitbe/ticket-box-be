import { Injectable } from '@nestjs/common';
import { UpdateOrderDto, OrderEntity, OrderRepository } from '@lib/modules/order';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateOrderUseCase extends ExecuteHandler<OrderEntity> {
	constructor(private readonly orderRepository: OrderRepository) {
		super();
	}

	async execute(id: string, data: UpdateOrderDto): Promise<OrderEntity> {
		return this.orderRepository.updateById({ id, data });
	}
}
