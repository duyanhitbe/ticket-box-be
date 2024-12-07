import { Injectable } from '@nestjs/common';
import { EventRepository } from '@lib/modules/event';
import { QueryHandler } from '@lib/common/abstracts';
import { Cache, REDIS_PREFIX_KEY } from '@lib/core/redis';

@Injectable()
export class FindLocationUseCase extends QueryHandler<string[]> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	@Cache({ prefix: REDIS_PREFIX_KEY.EVENT.LOCATION })
	async query(): Promise<string[]> {
		return this.eventRepository.findLocation();
	}
}
