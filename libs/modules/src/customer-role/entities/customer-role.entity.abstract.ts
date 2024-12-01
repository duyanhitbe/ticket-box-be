import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class CustomerRoleEntity extends BaseEntity {
	/**
	 * Tên nhóm quyền
	 */
	@SwaggerProperty()
	@Property('Tên nhóm quyền')
	name!: string;

	/**
	 * Mã nhóm quyền
	 */
	@SwaggerProperty()
	@Property('Mã nhóm quyền')
	code!: string;
}
