import { TicketRepository } from './ticket.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketTypeormEntity } from '../entities/ticket.typeorm.entity';

@Repository(TicketTypeormEntity)
export class TicketTypeormRepository
	extends BaseTypeormRepository<TicketTypeormEntity>
	implements TicketRepository {}
