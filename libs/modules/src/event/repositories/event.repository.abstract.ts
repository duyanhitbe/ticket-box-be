import { BaseRepository } from '@lib/base/repositories';
import { EventEntity } from '../entities/event.entity.abstract';

export abstract class EventRepository extends BaseRepository<EventEntity> {}
