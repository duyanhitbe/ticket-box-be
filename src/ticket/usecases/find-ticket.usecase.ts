import { Injectable } from '@nestjs/common';
import { FilterTicketDto, TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindTicketUseCase extends QueryHandler<PaginationResponse<TicketEntity>> {
	constructor(private readonly ticketRepository: TicketRepository) {
		super();
	}

	async query(filter: FilterTicketDto): Promise<PaginationResponse<TicketEntity>> {
		const { eventId, ticketGroupId, ticketInfoId, customerId, orderId } = filter;

		if (eventId) {
			set(filter, 'where.eventId', eventId);
		}

		if (ticketGroupId) {
			set(filter, 'where.ticketGroupId', ticketGroupId);
		}

		if (ticketInfoId) {
			set(filter, 'where.ticketInfoId', ticketInfoId);
		}

		if (customerId) {
			set(filter, 'where.customerId', customerId);
		}

		if (orderId) {
			set(filter, 'where.orderId', orderId);
		}

		filter.searchFields = ['code'];
		return this.ticketRepository.findPaginated(filter);
	}
}
