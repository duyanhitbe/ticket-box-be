import { BaseEntity } from '@lib/base/entities';
import { CustomerRoleEntity } from '@lib/modules/customer-role';

export abstract class CustomerEntity extends BaseEntity {
	/**
	 * Mã nhóm quyền
	 */
	customerRoleId!: string;

	/**
	 * Tên khách hàng
	 */
	name!: string;

	/**
	 * Số điện thoại khách hàng
	 */
	phone!: string;

	/**
	 * Email khách hàng
	 */
	email!: string;

	/**
	 * Mật khẩu
	 */
	password!: string;

	/**
	 * Cho phép công nợ
	 */
	allowDebtPurchase!: boolean;

	/* ========== Relations ========== */

	/**
	 * Nhóm quyền
	 */
	customerRole?: CustomerRoleEntity;
}
