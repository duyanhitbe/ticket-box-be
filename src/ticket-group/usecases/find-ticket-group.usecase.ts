import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupDto,
	TicketGroupListEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindTicketGroupUseCase extends QueryHandler<
	PaginationResponse<TicketGroupListEntity>
> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(filter: FilterTicketGroupDto): Promise<PaginationResponse<TicketGroupListEntity>> {
		filter.relations = ['dates', 'event'];
		filter.searchFields = ['name'];

		if (filter.eventId) {
			set(filter, 'where.eventId', filter.eventId);
		}

		const { data, meta } = await this.ticketGroupRepository.findPaginated(filter);
		const result: TicketGroupListEntity[] = [];

		data.forEach((ticketGroup) => {
			const detail = new TicketGroupListEntity();
			Object.assign(detail, ticketGroup);
			detail.dates = ticketGroup.dates?.map((item) => item.date);
			detail.eventName = ticketGroup.event?.name;
			result.push(detail);
		});

		return { data: result, meta };
	}
}
