import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository, FilterEventDto } from '@lib/modules/event';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { FindPaginatedOptions, Where } from '@lib/base/types';
import { cloneDeep } from 'lodash';
import { ILike } from 'typeorm';
import { REDIS_PREFIX_KEY, RedisService } from '@lib/core/redis';

@Injectable()
export class FindEventUseCase extends QueryHandler<PaginationResponse<EventEntity>> {
	constructor(
		private readonly eventRepository: EventRepository,
		private readonly redisService: RedisService
	) {
		super();
	}

	async query(filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		const { eventType, name, limit = '25', page = '1' } = filter;
		const cachedData = await this.redisService.get<PaginationResponse<EventEntity>>({
			prefix: REDIS_PREFIX_KEY.EVENT.LIST,
			key: [limit, page, eventType, name]
		});
		if (cachedData) return cachedData;

		const options: FindPaginatedOptions<EventEntity> = cloneDeep(filter);
		const where: Where<EventEntity> = {};

		if (eventType) {
			where.eventType = eventType;
		}

		if (name) {
			where.name = ILike(`%${name}%`);
		}

		options.where = where;

		const result = await this.eventRepository.findPaginated(options);
		this.redisService.setNx({
			prefix: REDIS_PREFIX_KEY.EVENT.LIST,
			key: [limit, page, eventType, name],
			value: result
		});
		return result;
	}
}
