import { TicketGroupEntity } from './ticket-group.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne, TypeormOneToMany } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { TicketGroupDateTypeormEntity } from '@lib/modules/ticket-group-date';

@Entity('ticket_groups')
export class TicketGroupTypeormEntity extends BaseTypeormEntity implements TicketGroupEntity {
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	name!: string;

	@TypeormColumn({ nullable: true })
	description?: string;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_DATE_TYPE,
		enumName: 'ENUM_DATE_TYPE'
	})
	dateType!: ENUM_DATE_TYPE;

	@TypeormColumn({ nullable: true, type: 'timestamptz' })
	fromDate?: Date;

	@TypeormColumn({ nullable: true, type: 'timestamptz' })
	toDate?: Date;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormOneToMany(() => TicketGroupDateTypeormEntity, (date) => date.ticketGroup)
	dates?: TicketGroupDateTypeormEntity[];
}
