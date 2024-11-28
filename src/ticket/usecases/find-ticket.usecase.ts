import { Injectable } from '@nestjs/common';
import { FilterTicketDto, TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketUseCase extends QueryHandler<PaginationResponse<TicketEntity>> {
	constructor(private readonly ticketRepository: TicketRepository) {
		super();
	}

	async query(filter: FilterTicketDto): Promise<PaginationResponse<TicketEntity>> {
		return this.ticketRepository.findPaginated(filter);
	}
}
