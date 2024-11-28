import { BaseRepository } from '@lib/base/repositories';
import { TicketPriceEntity } from '../entities/ticket-price.entity.abstract';

export abstract class TicketPriceRepository extends BaseRepository<TicketPriceEntity> {}
