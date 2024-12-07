import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository } from '@lib/modules/event';
import { QueryHandler } from '@lib/common/abstracts';
import { Cache, REDIS_PREFIX_KEY } from '@lib/core/redis';

@Injectable()
export class FindBannerUseCase extends QueryHandler<EventEntity[]> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	@Cache({ prefix: REDIS_PREFIX_KEY.EVENT.BANNER })
	async query(): Promise<EventEntity[]> {
		return this.eventRepository.find({
			where: {
				isBanner: true
			},
			order: {
				order: 'asc'
			}
		});
	}
}
