import { Injectable } from '@nestjs/common';
import {
	CreateOrderDetailDto,
	OrderDetailEntity,
	OrderDetailRepository
} from '@lib/modules/order-detail';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateOrderDetailUseCase extends ExecuteHandler<OrderDetailEntity> {
	constructor(private readonly orderDetailRepository: OrderDetailRepository) {
		super();
	}

	async execute(data: CreateOrderDetailDto): Promise<OrderDetailEntity> {
		return this.orderDetailRepository.create({ data });
	}
}
