import { EventDateRepository } from './event-date.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { EventDateTypeormEntity } from '../entities/event-date.typeorm.entity';

@Repository(EventDateTypeormEntity)
export class EventDateTypeormRepository
	extends BaseTypeormRepository<EventDateTypeormEntity>
	implements EventDateRepository {}
