import { BaseRepository } from '@lib/base/repositories';
import { TicketEntity } from '../entities/ticket.entity.abstract';

export abstract class TicketRepository extends BaseRepository<TicketEntity> {}
