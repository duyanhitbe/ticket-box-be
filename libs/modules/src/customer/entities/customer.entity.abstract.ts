import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { AgencyEntity } from '../../agency';
import { AgencyLevelEntity } from '../../agency-level';

export abstract class CustomerEntity extends BaseEntity {
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
	 * Mã cấp độ đại lý
	 */
	agencyLevel?: AgencyLevelEntity;

	/**
	 * Mã đại lý
	 */
	agency?: AgencyEntity;
}
