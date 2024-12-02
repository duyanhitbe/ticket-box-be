import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, FilterEventDto } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { FindPaginatedOptions, Where } from '@lib/base/types';
import { cloneDeep } from 'lodash';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		const { eventType } = filter;
		const options: FindPaginatedOptions<EventEntity> = cloneDeep(filter);
		const where: Where<EventEntity> = {};

		if (eventType) {
			where.eventType = eventType;
		}

		options.where = where;

		return this.eventRepository.findPaginated(options);
	}
}
