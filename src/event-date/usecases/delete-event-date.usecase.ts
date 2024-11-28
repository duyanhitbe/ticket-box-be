import { Injectable } from '@nestjs/common';
import { EventDateEntity, EventDateRepository } from '@lib/modules/event-date';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteEventDateUseCase extends ExecuteHandler<EventDateEntity> {
	constructor(private readonly eventDateRepository: EventDateRepository) {
		super();
	}

	async execute(id: string): Promise<EventDateEntity> {
		return this.eventDateRepository.softDeleteById({ id });
	}
}
