import { Injectable } from '@nestjs/common';
import {
	FilterTicketInfoDto,
	TicketInfoEntity,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketInfoUseCase extends QueryHandler<PaginationResponse<TicketInfoEntity>> {
	constructor(private readonly ticketInfoRepository: TicketInfoRepository) {
		super();
	}

	async query(filter: FilterTicketInfoDto): Promise<PaginationResponse<TicketInfoEntity>> {
		return this.ticketInfoRepository.findPaginated(filter);
	}
}
