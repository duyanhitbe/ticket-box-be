import { CustomerEntity } from './customer.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { CustomerRoleTypeormEntity } from '@lib/modules/customer-role';

@Entity('customers')
export class CustomerTypeormEntity extends BaseTypeormEntity implements CustomerEntity {
	@TypeormColumn()
	customerRoleId!: string;

	@TypeormColumn()
	name!: string;

	@TypeormColumn()
	phone!: string;

	@TypeormColumn()
	email!: string;

	@TypeormColumn()
	password!: string;

	@TypeormColumn()
	allowDebtPurchase!: boolean;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => CustomerRoleTypeormEntity)
	customerRole?: CustomerRoleTypeormEntity;
}
