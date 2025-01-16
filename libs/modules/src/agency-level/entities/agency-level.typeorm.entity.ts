import { AgencyLevelEntity } from './agency-level.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormUnique } from '@lib/common/decorators';

@Entity('agency_levels')
export class AgencyLevelTypeormEntity extends BaseTypeormEntity implements AgencyLevelEntity {
	@TypeormColumn()
	name!: string;

	@TypeormColumn()
	@TypeormUnique()
	level!: number;
}
