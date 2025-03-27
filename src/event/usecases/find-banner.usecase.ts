import { Injectable } from '@nestjs/common';
import { EventEntity, EventRepository } from '@lib/modules/event';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindBannerUseCase extends QueryHandler<EventEntity[]> {
	constructor(private readonly eventRepository: EventRepository) {
		super();
	}

	async query(ids?: string[]): Promise<EventEntity[]> {
		return this.eventRepository.findBanner(ids);
	}
}
