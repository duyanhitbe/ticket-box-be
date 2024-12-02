import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupDto,
	TicketGroupEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketGroupUseCase extends QueryHandler<PaginationResponse<TicketGroupEntity>> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(filter: FilterTicketGroupDto): Promise<PaginationResponse<TicketGroupEntity>> {
		return this.ticketGroupRepository.findPaginated(filter);
	}
}
