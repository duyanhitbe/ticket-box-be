import { BaseEntity } from '@lib/base/entities';

export abstract class CustomerRoleEntity extends BaseEntity {
	/**
	 * Tên nhóm quyền
	 */
	name!: string;
}
