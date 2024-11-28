import { Injectable } from '@nestjs/common';
import { OrderDetailEntity, OrderDetailRepository } from '@lib/modules/order-detail';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteOrderDetailUseCase extends ExecuteHandler<OrderDetailEntity> {
	constructor(private readonly orderDetailRepository: OrderDetailRepository) {
		super();
	}

	async execute(id: string): Promise<OrderDetailEntity> {
		return this.orderDetailRepository.softDeleteById({ id });
	}
}
