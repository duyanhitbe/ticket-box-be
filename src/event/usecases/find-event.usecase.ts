import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, FilterEventDto } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { FindTicketGroupDateForEventUseCase } from '../../ticket-group-date/usecases/find-ticket-group-date-for-event.usecase';
import { set } from 'lodash';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(
		private readonly eventRepository: EventRepository,
		// private readonly redisService: RedisService,
		private readonly findTicketGroupDateForEventUseCase: FindTicketGroupDateForEventUseCase
	) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		const { eventType, isWebClient } = filter;
		// const { limit, page } = getPageLimitOffset(filter);
		// const cachedData = await this.redisService.get<PaginationResponse<EventEntity>>({
		// 	prefix: REDIS_PREFIX_KEY.EVENT.LIST,
		// 	key: [limit, page, eventType]
		// });
		// if (cachedData) return cachedData;

		filter.searchFields = ['name', 'location'];
		if (eventType) {
			set(filter, 'where.eventType', eventType);
		}

		if (isWebClient === 'true') {
			set(filter, 'where.status', ENUM_STATUS.ACTIVE);
		}

		const result = await this.eventRepository.findPaginated(filter);

		if (isWebClient !== 'true') {
			result.data = await Promise.all(
				result.data.map(async (event) => {
					const { fromDate, dates } = await this.findTicketGroupDateForEventUseCase.query(
						event.id
					);

					event.startDate = fromDate || dates?.[0];

					return event;
				})
			);
		}

		// this.redisService.setNx({
		// 	prefix: REDIS_PREFIX_KEY.EVENT.LIST,
		// 	key: [limit, page, eventType],
		// 	value: result
		// });
		return result;
	}
}
