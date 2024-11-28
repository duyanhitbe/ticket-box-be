import { Injectable } from '@nestjs/common';
import {
	OrderDetailEntity,
	OrderDetailRepository,
	UpdateOrderDetailDto
} from '@lib/modules/order-detail';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateOrderDetailUseCase extends ExecuteHandler<OrderDetailEntity> {
	constructor(private readonly orderDetailRepository: OrderDetailRepository) {
		super();
	}

	async execute(id: string, data: UpdateOrderDetailDto): Promise<OrderDetailEntity> {
		return this.orderDetailRepository.updateById({ id, data });
	}
}
