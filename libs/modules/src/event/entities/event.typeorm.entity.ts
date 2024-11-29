import { EventEntity } from './event.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { ENUM_EVENT_TYPE } from '../event.enum';
import { TypeormColumn } from '@lib/common/decorators';
import { ENUM_DATE_TYPE } from '@lib/modules/common';

@Entity('events')
export class EventTypeormEntity extends BaseTypeormEntity implements EventEntity {
	@TypeormColumn()
	name!: string;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_EVENT_TYPE,
		enumName: 'ENUM_EVENT_TYPE'
	})
	eventType!: ENUM_EVENT_TYPE;

	@TypeormColumn()
	banner!: string;

	@TypeormColumn()
	thumbnail!: string;

	@TypeormColumn({ nullable: true })
	description?: string;

	@TypeormColumn()
	ratingStar!: number;

	@TypeormColumn()
	displayPrice!: number;

	@TypeormColumn()
	isBanner!: boolean;

	@TypeormColumn()
	order!: number;

	@TypeormColumn({ nullable: true })
	location?: string;

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
}
