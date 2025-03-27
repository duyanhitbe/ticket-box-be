import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, FilterEventDto } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { FindTicketGroupDateForEventUseCase } from '../../ticket-group-date/usecases/find-ticket-group-date-for-event.usecase';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly findTicketGroupDateForEventUseCase: FindTicketGroupDateForEventUseCase
	) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		const { isWebClient } = filter;
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
