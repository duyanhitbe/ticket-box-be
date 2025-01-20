import {
	I18nIsEnum,
	I18nIsNotEmpty,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ENUM_ADMIN_TOKEN_ROLE } from '@lib/core/jwt';

export class LoginDto {
	@SwaggerProperty({
		enum: ENUM_ADMIN_TOKEN_ROLE,
		enumName: 'ENUM_ADMIN_TOKEN_ROLE'
	})
	@I18nIsEnum(ENUM_ADMIN_TOKEN_ROLE)
	@Property('Loại tài khoản')
	type!: ENUM_ADMIN_TOKEN_ROLE;

	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Tài khoản')
	username!: string;

	@SwaggerProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Mật khẩu')
	password!: string;
}
