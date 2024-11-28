import { Injectable } from '@nestjs/common';
import { CreateEventDateDto, EventDateEntity, EventDateRepository } from '@lib/modules/event-date';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateEventDateUseCase extends ExecuteHandler<EventDateEntity> {
	constructor(private readonly eventDateRepository: EventDateRepository) {
		super();
	}

	async execute(data: CreateEventDateDto): Promise<EventDateEntity> {
		return this.eventDateRepository.create({ data });
	}
}
