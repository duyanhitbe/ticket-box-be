import { BaseRepository } from '@lib/base/repositories';
import { TicketEntity } from '../entities/ticket.entity.abstract';
import { TicketTypeormEntity } from '../entities/ticket.typeorm.entity';

export abstract class TicketRepository extends BaseRepository<TicketEntity> {
	abstract restockByOrderId(orderId: string): Promise<TicketTypeormEntity[]>;
}
