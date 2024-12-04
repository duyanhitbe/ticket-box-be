import { EventEntity } from './event.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { ENUM_EVENT_TYPE } from '../event.enum';
import { TypeormColumn } from '@lib/common/decorators';

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
	image!: string;

	@TypeormColumn()
	thumbnail!: string;

	@TypeormColumn({ nullable: true })
	description?: string;

	@TypeormColumn({ type: 'float', default: 5 })
	ratingStar!: number;

	@TypeormColumn({ type: 'float' })
	displayPrice!: number;

	@TypeormColumn({ default: true })
	isBanner!: boolean;

	@TypeormColumn({ default: 1 })
	order!: number;

	@TypeormColumn({ nullable: true })
	location?: string;
}
