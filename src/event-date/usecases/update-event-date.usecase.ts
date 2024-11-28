import { Injectable } from '@nestjs/common';
import { EventDateEntity, EventDateRepository, UpdateEventDateDto } from '@lib/modules/event-date';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateEventDateUseCase extends ExecuteHandler<EventDateEntity> {
	constructor(private readonly eventDateRepository: EventDateRepository) {
		super();
	}

	async execute(id: string, data: UpdateEventDateDto): Promise<EventDateEntity> {
		return this.eventDateRepository.updateById({ id, data });
	}
}
