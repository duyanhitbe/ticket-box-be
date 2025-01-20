import {
	I18nIsEmail,
	I18nIsNotEmpty,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';

export class RegisterCustomerDto {
	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Họ và tên')
	name!: string;

	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Số điện thoại')
	phone!: string;

	@SwaggerProperty()
	@I18nIsEmail()
	@Property('Địa chỉ email')
	email!: string;

	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Mật khẩu')
	password!: string;
}
