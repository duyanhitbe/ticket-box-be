import { Injectable } from '@nestjs/common';
import { FilterOrderDto, ListOrderEntity, OrderRepository } from '@lib/modules/order';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindOrderUseCase extends QueryHandler<PaginationResponse<ListOrderEntity>> {
	constructor(private readonly orderRepository: OrderRepository) {
		super();
	}

	async query(filter: FilterOrderDto): Promise<PaginationResponse<ListOrderEntity>> {
		return this.orderRepository.findPaginated(filter);
	}
}
