import { Injectable } from '@nestjs/common';
import { EventRepository } from '@lib/modules/event';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindLocationUseCase extends QueryHandler<string[]> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async query(): Promise<string[]> {
		return this.eventRepository.findLocation();
	}
}
