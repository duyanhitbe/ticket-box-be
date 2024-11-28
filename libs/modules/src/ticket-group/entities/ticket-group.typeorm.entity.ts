import { TicketGroupEntity } from './ticket-group.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('ticket-groups')
export class TicketGroupTypeormEntity extends BaseTypeormEntity implements TicketGroupEntity {}
