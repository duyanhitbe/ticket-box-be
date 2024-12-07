import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository } from '@lib/modules/event';
import { QueryHandler } from '@lib/common/abstracts';
import { REDIS_PREFIX_KEY, RedisService } from '@lib/core/redis';

@Injectable()
export class DetailEventUseCase extends QueryHandler<EventEntity> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly redisService: RedisService
	) {
		super();
	}

	async query(id: string): Promise<EventEntity> {
		const cachedData = await this.redisService.get<EventEntity>({
			prefix: REDIS_PREFIX_KEY.EVENT.DETAIL,
			key: id
		});
		if (cachedData) return cachedData;

		return this.eventRepository.findByIdOrThrow({ id }).then((res) => this.cacheData(res));
	}

	private async cacheData(event: EventEntity): Promise<EventEntity> {
		this.redisService.setNx({
			prefix: REDIS_PREFIX_KEY.EVENT.DETAIL,
			key: event.id,
			value: event
		});
		return event;
	}
}
