import { Injectable } from '@nestjs/common';
import { OrderDetailEntity, OrderDetailRepository } from '@lib/modules/order-detail';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailOrderDetailUseCase extends QueryHandler<OrderDetailEntity> {
	constructor(private readonly orderDetailRepository: OrderDetailRepository) {
		super();
	}

	async query(id: string): Promise<OrderDetailEntity> {
		return this.orderDetailRepository.findByIdOrThrow({ id });
	}
}
