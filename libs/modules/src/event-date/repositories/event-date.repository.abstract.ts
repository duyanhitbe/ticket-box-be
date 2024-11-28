import { BaseRepository } from '@lib/base/repositories';
import { EventDateEntity } from '../entities/event-date.entity.abstract';

export abstract class EventDateRepository extends BaseRepository<EventDateEntity> {}
