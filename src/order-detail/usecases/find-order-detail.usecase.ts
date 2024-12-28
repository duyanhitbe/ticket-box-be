import { Injectable } from '@nestjs/common';
import {
	FilterOrderDetailDto,
	OrderDetailEntity,
	OrderDetailRepository
} from '@lib/modules/order-detail';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindOrderDetailUseCase extends QueryHandler<PaginationResponse<OrderDetailEntity>> {
	constructor(private readonly orderDetailRepository: OrderDetailRepository) {
		super();
	}

	async query(filter: FilterOrderDetailDto): Promise<PaginationResponse<OrderDetailEntity>> {
		const { orderId } = filter;

		if (orderId) {
			set(filter, 'where.orderId', orderId);
		}

		return this.orderDetailRepository.findPaginated(filter);
	}
}
