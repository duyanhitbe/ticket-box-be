import { Injectable } from '@nestjs/common';
import {
	FilterOrderDetailDto,
	OrderDetailEntity,
	OrderDetailRepository
} from '@lib/modules/order-detail';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindOrderDetailUseCase extends QueryHandler<PaginationResponse<OrderDetailEntity>> {
	constructor(private readonly orderDetailRepository: OrderDetailRepository) {
		super();
	}

	async query(filter: FilterOrderDetailDto): Promise<PaginationResponse<OrderDetailEntity>> {
		return this.orderDetailRepository.findPaginated(filter);
	}
}
