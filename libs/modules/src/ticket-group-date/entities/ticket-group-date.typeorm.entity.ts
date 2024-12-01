import { TicketGroupDateEntity } from './ticket-group-date.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';

@Entity('ticket-group-dates')
export class TicketGroupDateTypeormEntity
	extends BaseTypeormEntity
	implements TicketGroupDateEntity
{
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	ticketGroupId!: string;

	@TypeormColumn({ type: 'timestamptz' })
	date!: Date;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => TicketGroupTypeormEntity)
	ticketGroup?: TicketGroupTypeormEntity;
}
