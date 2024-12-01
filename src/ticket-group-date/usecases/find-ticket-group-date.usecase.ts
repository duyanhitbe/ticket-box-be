import { Injectable } from '@nestjs/common';
import { FilterTicketGroupDateDto, TicketGroupDateEntity, TicketGroupDateRepository } from '@lib/modules/ticket-group-date';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketGroupDateUseCase extends QueryHandler<PaginationResponse<TicketGroupDateEntity>> {
	constructor(private readonly ticketGroupDateRepository: TicketGroupDateRepository) {
		super();
	}

	async query(filter: FilterTicketGroupDateDto): Promise<PaginationResponse<TicketGroupDateEntity>> {
		return this.ticketGroupDateRepository.findPaginated(filter);
	}
}
