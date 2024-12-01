import { TicketGroupEntity } from './ticket-group.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';
import { ENUM_DATE_TYPE } from '@lib/modules/common';

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

	@TypeormColumn({ type: 'jsonb', nullable: true })
	dates?: Date[];

	@TypeormColumn({ nullable: true })
	fromDate?: Date;

	@TypeormColumn({ nullable: true })
	toDate?: Date;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;
}
