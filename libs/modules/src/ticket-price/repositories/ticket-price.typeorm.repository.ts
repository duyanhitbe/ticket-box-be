import { TicketPriceRepository } from './ticket-price.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketPriceTypeormEntity } from '../entities/ticket-price.typeorm.entity';

@Repository(TicketPriceTypeormEntity)
export class TicketPriceTypeormRepository
	extends BaseTypeormRepository<TicketPriceTypeormEntity>
	implements TicketPriceRepository {}
