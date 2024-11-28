import { TicketPriceEntity } from './ticket-price.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('ticket-prices')
export class TicketPriceTypeormEntity extends BaseTypeormEntity implements TicketPriceEntity {}
