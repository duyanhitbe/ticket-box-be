import { Injectable } from '@nestjs/common';
import { FilterOrderDto, ListOrderEntity, OrderRepository } from '@lib/modules/order';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindOrderUseCase extends QueryHandler<PaginationResponse<ListOrderEntity>> {
	constructor(private readonly orderRepository: OrderRepository) {
		super();
	}

	async query(filter: FilterOrderDto): Promise<PaginationResponse<ListOrderEntity>> {
		const { eventId, customerId, orderStatus, paymentMethod } = filter;

		if (eventId) {
			set(filter, 'where.eventId', eventId);
		}

		if (customerId) {
			set(filter, 'where.customerId', customerId);
		}

		if (orderStatus) {
			set(filter, 'where.orderStatus', orderStatus);
		}

		if (paymentMethod) {
			set(filter, 'where.paymentMethod', paymentMethod);
		}

		filter.searchFields = ['customer_name', 'customer_phone', 'customer_email', 'code'];
		return this.orderRepository.findPaginated(filter);
	}
}
