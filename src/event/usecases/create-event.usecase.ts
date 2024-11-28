import { Injectable } from '@nestjs/common';
import { CreateEventDto, EventEntity, EventRepository } from '@lib/modules/event';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateEventUseCase extends ExecuteHandler<EventEntity> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(data: CreateEventDto): Promise<EventEntity> {
		return this.eventRepository.create({ data });
	}
}
