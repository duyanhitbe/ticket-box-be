import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository } from '@lib/modules/event';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteEventUseCase extends ExecuteHandler<EventEntity> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(id: string): Promise<EventEntity> {
		return this.eventRepository.softDeleteById({ id });
	}
}
