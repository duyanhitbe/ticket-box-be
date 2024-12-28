import { Injectable } from '@nestjs/common';
import {
	FilterTicketPriceDto,
	TicketPriceEntity,
	TicketPriceRepository
} from '@lib/modules/ticket-price';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindTicketPriceUseCase extends QueryHandler<PaginationResponse<TicketPriceEntity>> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async query(filter: FilterTicketPriceDto): Promise<PaginationResponse<TicketPriceEntity>> {
		const { eventId, ticketGroupId, customerRoleId } = filter;

		if (eventId) {
			set(filter, 'where.eventId', eventId);
		}
		if (ticketGroupId) {
			set(filter, 'where.ticketGroupId', ticketGroupId);
		}
		if (customerRoleId) {
			set(filter, 'where.customerRoleId', customerRoleId);
		}

		return this.ticketPriceRepository.findPaginated(filter);
	}
}
