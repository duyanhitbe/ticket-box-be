import { I18nIsNotEmpty, I18nIsString, Property, SwaggerProperty } from '@lib/common/decorators';

export class LoginCustomerDto {
	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Số điện thoại')
	phone!: string;

	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Mật khẩu')
	password!: string;
}
