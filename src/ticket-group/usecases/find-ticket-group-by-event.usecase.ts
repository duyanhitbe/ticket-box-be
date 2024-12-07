import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupByEventDto,
	TicketGroupByEventEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { QueryHandler } from '@lib/common/abstracts';
import { REDIS_PREFIX_KEY, RedisService } from '@lib/core/redis';
import { formatDate } from '@lib/common/helpers';

@Injectable()
export class FindTicketGroupByEventUseCase extends QueryHandler<TicketGroupByEventEntity[]> {
	constructor(
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly redisService: RedisService
	) {
		super();
	}

	async query(filter: FilterTicketGroupByEventDto): Promise<TicketGroupByEventEntity[]> {
		const { eventId, date } = filter;
		const cachedData = await this.redisService.get({
			prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
			key: [eventId, formatDate(new Date(date), 'DD-MM-YYYY')]
		});
		if (cachedData) return cachedData;

		const result = await this.ticketGroupRepository.findPaginatedByEvent(filter);
		this.redisService.setNx({
			prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
			key: [eventId, formatDate(new Date(date), 'DD-MM-YYYY')],
			value: result
		});
		return result;
	}
}
