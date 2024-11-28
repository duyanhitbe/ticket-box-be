import { Injectable } from '@nestjs/common';
import { UpdateEventDto, EventEntity, EventRepository } from '@lib/modules/event';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateEventUseCase extends ExecuteHandler<EventEntity> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async execute(id: string, data: UpdateEventDto): Promise<EventEntity> {
		return this.eventRepository.updateById({ id, data });
	}
}
