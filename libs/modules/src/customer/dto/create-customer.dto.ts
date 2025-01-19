import {
	I18nIsBoolean,
	I18nIsEmail,
	I18nIsNotEmpty,
	I18nIsNumberString,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class CreateCustomerDto {
	/**
	 * Tên khách hàng
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tên khách hàng')
	name!: string;

	/**
	 * Số điện thoại khách hàng
	 */
	@I18nIsNumberString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Số điện thoại khách hàng')
	phone!: string;

	/**
	 * Email khách hàng
	 */
	@I18nIsEmail()
	@SwaggerProperty()
	@Property('Email khách hàng')
	email!: string;

	/**
	 * Mật khẩu
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mật khẩu')
	password!: string;

	/**
	 * Cho phép công nợ
	 */
	@IsOptional()
	@I18nIsBoolean()
	@SwaggerProperty()
	@Property('Cho phép công nợ')
	allowDebtPurchase?: boolean;
}
