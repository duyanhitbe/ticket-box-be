import { TicketGroupRepository } from './ticket-group.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketGroupTypeormEntity } from '../entities/ticket-group.typeorm.entity';

@Repository(TicketGroupTypeormEntity)
export class TicketGroupTypeormRepository
	extends BaseTypeormRepository<TicketGroupTypeormEntity>
	implements TicketGroupRepository {}
