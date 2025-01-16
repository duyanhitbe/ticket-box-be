import { BaseEntity } from '@lib/base/entities';
import { CustomerRoleEntity } from '@lib/modules/customer-role';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { AgencyLevelEntity } from '../../agency-level';
import { AgencyEntity } from '../../agency';

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
	@Property('Mật khẩu')
	password!: string;

	/**
	 * Cho phép công nợ
	 */
	@SwaggerProperty()
	@Property('Cho phép công nợ')
	allowDebtPurchase!: boolean;

	/**
	 * Mã cấp độ đại lý
	 */
	@SwaggerProperty()
	@Property('Mã cấp độ đại lý')
	agencyLevelId?: string;

	/**
	 * Mã đại lý
	 */
	@SwaggerProperty()
	@Property('Mã đại lý')
	agencyId?: string;

	/**
	 * Tài khoản đại lý
	 */
	@SwaggerProperty()
	@Property('Tài khoản đại lý')
	isAgency!: boolean;

	/* ========== Relations ========== */

	/**
	 * Nhóm quyền
	 */
	customerRole?: CustomerRoleEntity;

	/**
	 * Mã cấp độ đại lý
	 */
	agencyLevel?: AgencyLevelEntity;

	/**
	 * Mã đại lý
	 */
	agency?: AgencyEntity;
}
