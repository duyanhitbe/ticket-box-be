import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, UpdateEventDto } from '@lib/modules/event';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventService } from '../event.service';

@Injectable()
export class UpdateEventUseCase extends ExecuteHandler<EventEntity> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventService: EventService
	) {
		super();
	}

	async execute(id: string, data: UpdateEventDto): Promise<EventEntity> {
		return this.eventRepository
			.updateById({ id, data })
			.then((res) => this.eventService.deleteCache(res));
	}
}
