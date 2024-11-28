import { Injectable } from '@nestjs/common';
import { FilterEventDto, EventEntity, EventRepository } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		return this.eventRepository.findPaginated(filter);
	}
}
