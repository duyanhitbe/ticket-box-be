import { Injectable } from '@nestjs/common';
import { EventDateEntity, EventDateRepository, FilterEventDateDto } from '@lib/modules/event-date';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindEventDateUseCase extends QueryHandler<PaginationResponse<EventDateEntity>> {
	constructor(private readonly eventDateRepository: EventDateRepository) {
		super();
	}

	async query(filter: FilterEventDateDto): Promise<PaginationResponse<EventDateEntity>> {
		return this.eventDateRepository.findPaginated(filter);
	}
}
