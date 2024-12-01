import { TicketGroupDateRepository } from './ticket-group-date.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketGroupDateTypeormEntity } from '../entities/ticket-group-date.typeorm.entity';

@Repository(TicketGroupDateTypeormEntity)
export class TicketGroupDateTypeormRepository
	extends BaseTypeormRepository<TicketGroupDateTypeormEntity>
	implements TicketGroupDateRepository {}
