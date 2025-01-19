import { BaseTypeormEntity } from '@lib/base/entities';
import { TypeormColumn, TypeormManyToOne, TypeormUnique } from '@lib/common/decorators';
import { Argon2Service } from '@lib/core/hash';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Entity } from 'typeorm';
import { AgencyTypeormEntity } from '../../agency';
import { AgencyLevelTypeormEntity } from '../../agency-level';
import { CustomerEntity } from './customer.entity.abstract';

@Entity('customers')
export class CustomerTypeormEntity extends BaseTypeormEntity implements CustomerEntity {
	@TypeormColumn()
	name!: string;

	@TypeormColumn()
	@TypeormUnique()
	phone!: string;

	@TypeormColumn()
	email!: string;

	@TypeormColumn()
	@Exclude()
	password!: string;

	@TypeormColumn({ default: false })
	allowDebtPurchase!: boolean;

	@TypeormColumn({ nullable: true })
	agencyLevelId?: string;

	@TypeormColumn({ nullable: true })
	agencyId?: string;

	@TypeormColumn({ default: false })
	isAgency!: boolean;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => AgencyLevelTypeormEntity, undefined, { nullable: true })
	agencyLevel?: AgencyLevelTypeormEntity;

	@TypeormManyToOne(() => AgencyTypeormEntity, undefined, { nullable: true })
	agency?: AgencyTypeormEntity;

	/* ========== Hooks ========== */

	@BeforeInsert()
	async beforeInsert() {
		const hashService = new Argon2Service();
		this.password = await hashService.hash(this.password);
	}
}
