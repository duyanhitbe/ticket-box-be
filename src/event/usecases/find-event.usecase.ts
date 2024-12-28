import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, FilterEventDto } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { REDIS_PREFIX_KEY, RedisService } from '@lib/core/redis';
import { FindTicketGroupDateForEventUseCase } from '../../ticket-group-date/usecases/find-ticket-group-date-for-event.usecase';
import { getPageLimitOffset } from '@lib/common/helpers';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly redisService: RedisService,
		private readonly findTicketGroupDateForEventUseCase: FindTicketGroupDateForEventUseCase
	) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		const { eventType, name } = filter;
		const { limit, page } = getPageLimitOffset(filter);
		const cachedData = await this.redisService.get<PaginationResponse<EventEntity>>({
			prefix: REDIS_PREFIX_KEY.EVENT.LIST,
			key: [limit, page, eventType, name]
		});
		if (cachedData) return cachedData;

		const result = await this.eventRepository.findPaginated(filter);

		result.data = await Promise.all(
			result.data.map(async (event) => {
				const { fromDate, dates } = await this.findTicketGroupDateForEventUseCase.query(
					event.id
				);

				event.startDate = fromDate || dates?.[0];

				return event;
			})
		);

		this.redisService.setNx({
			prefix: REDIS_PREFIX_KEY.EVENT.LIST,
			key: [limit, page, eventType, name],
			value: result
		});
		return result;
	}
}
