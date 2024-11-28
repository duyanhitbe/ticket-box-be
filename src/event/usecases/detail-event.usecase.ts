import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository } from '@lib/modules/event';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailEventUseCase extends QueryHandler<EventEntity> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async query(id: string): Promise<EventEntity> {
		return this.eventRepository.findByIdOrThrow({ id });
	}
}
