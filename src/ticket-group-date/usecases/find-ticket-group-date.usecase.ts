import { QueryHandler } from '@lib/common/abstracts';
import {
	EventTicketGroupDateEntity,
	FilterTicketGroupDateDto
} from '@lib/modules/ticket-group-date';
import { Injectable } from '@nestjs/common';
import { FindTicketGroupDateForEventUseCase } from './find-ticket-group-date-for-event.usecase';

@Injectable()
export class FindTicketGroupDateUseCase extends QueryHandler<EventTicketGroupDateEntity> {
	constructor(
		// private readonly redisService: RedisService,
		private readonly findTicketGroupDateForEventUseCase: FindTicketGroupDateForEventUseCase
	) {
		super();
	}

	async query(filter: FilterTicketGroupDateDto): Promise<EventTicketGroupDateEntity> {
		// const cachedData = await this.redisService.get<EventTicketGroupDateEntity>({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP_DATE.EVENT,
		// 	key: filter.eventId
		// });
		// if (cachedData) return cachedData;

		const result = await this.findTicketGroupDateForEventUseCase.query(filter.eventId);

		// this.redisService.setNx({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP_DATE.EVENT,
		// 	key: filter.eventId,
		// 	value: result
		// });

		return result;
	}
}
