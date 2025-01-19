import { Injectable } from '@nestjs/common';
import {
	FilterTicketInfoByGroupDto,
	TicketInfoByGroupEntity,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketInfoByGroupUseCase extends QueryHandler<TicketInfoByGroupEntity[]> {
	constructor(private readonly ticketInfoRepository: TicketInfoRepository) {
		super();
	}

	async query(
		filter: FilterTicketInfoByGroupDto,
		agencyLevelId?: string
	): Promise<TicketInfoByGroupEntity[]> {
		return this.ticketInfoRepository.findAllWithPriceByGroup(
			filter.ticketGroupId,
			agencyLevelId
		);
	}
}
