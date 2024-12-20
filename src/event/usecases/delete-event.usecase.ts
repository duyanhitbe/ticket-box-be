import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository } from '@lib/modules/event';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventService } from '../event.service';

@Injectable()
export class DeleteEventUseCase extends ExecuteHandler<EventEntity> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventService: EventService
	) {
		super();
	}

	async execute(id: string): Promise<EventEntity> {
		return this.eventRepository
			.softDeleteById({ id })
			.then((res) => this.eventService.deleteCache(res));
	}
}
