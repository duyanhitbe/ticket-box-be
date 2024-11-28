import { EventRepository } from './event.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { EventTypeormEntity } from '../entities/event.typeorm.entity';

@Repository(EventTypeormEntity)
export class EventTypeormRepository
	extends BaseTypeormRepository<EventTypeormEntity>
	implements EventRepository {}
