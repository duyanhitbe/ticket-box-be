import { TicketInfoEntity } from './ticket-info.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('ticket_infos')
export class TicketInfoTypeormEntity extends BaseTypeormEntity implements TicketInfoEntity {}
