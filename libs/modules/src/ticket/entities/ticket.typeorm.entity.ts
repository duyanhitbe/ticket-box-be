import { TicketEntity } from './ticket.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('tickets')
export class TicketTypeormEntity extends BaseTypeormEntity implements TicketEntity {}
