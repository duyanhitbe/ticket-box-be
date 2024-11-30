import { BaseEntity } from '@lib/base/entities';
import { CustomerRoleEntity } from '@lib/modules/customer-role';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class CustomerEntity extends BaseEntity {
	/**
	 * Mã nhóm quyền
	 */
	@SwaggerProperty()
	@Property('Mã nhóm quyền')
	customerRoleId!: string;

	/**
	 * Tên khách hàng
	 */
	@SwaggerProperty()
	@Property('Tên khách hàng')
	name!: string;

	/**
	 * Số điện thoại khách hàng
	 */
	@SwaggerProperty()
	@Property('Số điện thoại khách hàng')
	phone!: string;

	/**
	 * Email khách hàng
	 */
	@SwaggerProperty()
	@Property('Email khách hàng')
	email!: string;

	/**
	 * Mật khẩu
	 */
	@SwaggerProperty()
	@Property('Mật khẩu')
	password!: string;

	/**
	 * Cho phép công nợ
	 */
	@SwaggerProperty()
	@Property('Cho phép công nợ')
	allowDebtPurchase!: boolean;

	/* ========== Relations ========== */

	/**
	 * Nhóm quyền
	 */
	customerRole?: CustomerRoleEntity;
}
