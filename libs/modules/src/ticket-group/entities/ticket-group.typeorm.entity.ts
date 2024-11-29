import { TicketGroupEntity } from './ticket-group.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';

@Entity('ticket_groups')
export class TicketGroupTypeormEntity extends BaseTypeormEntity implements TicketGroupEntity {
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	name!: string;

	@TypeormColumn({ nullable: true })
	description?: string;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;
}
