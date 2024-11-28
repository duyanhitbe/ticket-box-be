import { Injectable } from '@nestjs/common';
import { EventDateEntity, EventDateRepository } from '@lib/modules/event-date';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailEventDateUseCase extends QueryHandler<EventDateEntity> {
	constructor(private readonly eventDateRepository: EventDateRepository) {
		super();
	}

	async query(id: string): Promise<EventDateEntity> {
		return this.eventDateRepository.findByIdOrThrow({ id });
	}
}
