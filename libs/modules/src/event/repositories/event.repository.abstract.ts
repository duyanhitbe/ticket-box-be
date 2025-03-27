import { BaseRepository } from '@lib/base/repositories';
import { EventEntity } from '../entities/event.entity.abstract';

export abstract class EventRepository extends BaseRepository<EventEntity> {
	abstract findLocation(): Promise<string[]>;

	abstract findBanner(ids?: string[]): Promise<EventEntity[]>;
}
