import { TicketGroupDateEntity } from './ticket-group-date.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { BeforeInsert, Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';
import { getStartOfDay } from '@lib/common/helpers';

@Entity('ticket_group_dates')
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

	/* ========== Hooks ========== */

	@BeforeInsert()
	beforeInsert() {
		this.date = getStartOfDay(new Date(this.date).toISOString());
	}
}
