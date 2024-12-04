import { CustomerEntity } from './customer.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { BeforeInsert, Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne, TypeormUnique } from '@lib/common/decorators';
import { CustomerRoleTypeormEntity } from '@lib/modules/customer-role';
import { Argon2Service } from '@lib/core/hash';
import { Exclude } from 'class-transformer';

@Entity('customers')
export class CustomerTypeormEntity extends BaseTypeormEntity implements CustomerEntity {
	@TypeormColumn()
	customerRoleId!: string;

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

	@TypeormColumn({ nullable: true })
	allowDebtPurchase!: boolean;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => CustomerRoleTypeormEntity)
	customerRole?: CustomerRoleTypeormEntity;

	/* ========== Hooks ========== */

	@BeforeInsert()
	async beforeInsert() {
		const hashService = new Argon2Service();
		this.password = await hashService.hash(this.password);
	}
}
