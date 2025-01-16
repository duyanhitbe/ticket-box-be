import { AgencyEntity } from './agency.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { AgencyLevelTypeormEntity } from '../../agency-level';

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
}
