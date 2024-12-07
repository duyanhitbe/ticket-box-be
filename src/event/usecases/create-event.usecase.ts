import { Injectable } from '@nestjs/common';
import { CreateEventDto, EventEntity, EventRepository } from '@lib/modules/event';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventService } from '../event.service';

@Injectable()
export class CreateEventUseCase extends ExecuteHandler<EventEntity> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventService: EventService
	) {
		super();
	}

	async execute(data: CreateEventDto): Promise<EventEntity> {
		return this.eventRepository
			.create({ data })
			.then((res) => this.eventService.deleteCache(res));
	}
}
