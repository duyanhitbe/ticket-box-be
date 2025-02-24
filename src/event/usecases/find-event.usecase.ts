import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, FilterEventDto } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { FindTicketGroupDateForEventUseCase } from '../../ticket-group-date/usecases/find-ticket-group-date-for-event.usecase';
import { set } from 'lodash';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';
import { In } from 'typeorm';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly findTicketGroupDateForEventUseCase: FindTicketGroupDateForEventUseCase
	) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		const { eventType, isWebClient, eventIds } = filter;

		filter.searchFields = ['name', 'location'];
		if (eventType) {
			set(filter, 'where.eventType', eventType);
		}

		if (isWebClient === 'true') {
			set(filter, 'where.status', ENUM_STATUS.ACTIVE);
		} else if (eventIds?.length) {
			set(filter, 'where.id', In(eventIds));
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

		return result;
	}
}
