import { BadRequestException, Injectable } from '@nestjs/common';
import {
	FilterTicketGroupDto,
	TicketGroupListEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { In } from 'typeorm';

@Injectable()
export class FindTicketGroupUseCase extends QueryHandler<
	PaginationResponse<TicketGroupListEntity>
> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(filter: FilterTicketGroupDto): Promise<PaginationResponse<TicketGroupListEntity>> {
		const { user } = filter;
		const eventIds = user?.eventIds || [];
		filter.relations = ['dates', 'event'];
		filter.searchFields = ['name'];

		if (user?.role === ENUM_TOKEN_ROLE.AGENCY && eventIds.length) {
			if (filter.eventId && !eventIds.includes(filter.eventId)) {
				throw new BadRequestException('Invalid event id');
			}

			set(filter, 'where.eventId', In(eventIds));
		}

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
