import { Injectable } from '@nestjs/common';
import { REDIS_PREFIX_KEY, RedisService } from '@lib/core/redis';
import { EventEntity } from '@lib/modules/event';

@Injectable()
export class EventService {
	constructor(private readonly redisService: RedisService) {}

	async deleteCache(event: EventEntity): Promise<EventEntity> {
		if (event.isBanner) {
			await this.redisService.del({
				prefix: REDIS_PREFIX_KEY.EVENT.BANNER
			});
		}
		if (event.location) {
			await this.redisService.del({
				prefix: REDIS_PREFIX_KEY.EVENT.LOCATION
			});
		}
		await this.redisService.delGroup({
			prefix: REDIS_PREFIX_KEY.EVENT.LIST
		});
		await this.redisService.del({
			prefix: REDIS_PREFIX_KEY.EVENT.DETAIL,
			key: event.id
		});
		return event;
	}
}
