import { TicketInfoEntity } from './ticket-info.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';

@Entity('ticket_infos')
export class TicketInfoTypeormEntity extends BaseTypeormEntity implements TicketInfoEntity {
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	ticketGroupId!: string;

	@TypeormColumn()
	name!: string;

	@TypeormColumn({ nullable: true })
	quantity?: number;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => TicketGroupTypeormEntity)
	ticketGroup?: TicketGroupTypeormEntity;
}
