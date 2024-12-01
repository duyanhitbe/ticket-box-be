import { CustomerRoleEntity } from './customer-role.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormUnique } from '@lib/common/decorators';

@Entity('customer_roles')
export class CustomerRoleTypeormEntity extends BaseTypeormEntity implements CustomerRoleEntity {
	@TypeormColumn()
	name!: string;

	/**
	 * Mã nhóm quyền
	 */
	@TypeormColumn()
	@TypeormUnique()
	code!: string;
}
