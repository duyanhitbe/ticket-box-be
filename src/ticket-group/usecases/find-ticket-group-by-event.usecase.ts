import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupByEventDto,
	TicketGroupByEventEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketGroupByEventUseCase extends QueryHandler<TicketGroupByEventEntity[]> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(filter: FilterTicketGroupByEventDto): Promise<TicketGroupByEventEntity[]> {
		return this.ticketGroupRepository.findPaginatedByEvent(filter);
	}
}
