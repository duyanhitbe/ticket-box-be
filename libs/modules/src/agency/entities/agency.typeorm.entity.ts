import { AgencyEntity } from './agency.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { AgencyLevelTypeormEntity } from '../../agency-level';
import { EventTypeormEntity } from '../../event';

@Entity('agencies')
export class AgencyTypeormEntity extends BaseTypeormEntity implements AgencyEntity {
	@TypeormColumn()
	name!: string;

	@TypeormColumn({ nullable: true })
	phone?: string;

	@TypeormColumn({ nullable: true })
	address?: string;

	@TypeormColumn()
	agencyLevelId!: string;

	@TypeormManyToOne(() => AgencyLevelTypeormEntity)
	agencyLevel?: AgencyLevelTypeormEntity;

	@ManyToMany(() => EventTypeormEntity)
	@JoinTable({
		name: 'agency_event',
		joinColumn: {
			name: 'agency_id'
		},
		inverseJoinColumn: {
			name: 'event_id'
		}
	})
	events?: EventTypeormEntity[];
}
