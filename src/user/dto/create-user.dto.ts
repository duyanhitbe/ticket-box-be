import { ApiProperty } from '@nestjs/swagger';
import { I18nIsNotEmpty, I18nIsString, Property } from '@lib/common/decorators';

export class CreateUserDto {
	@ApiProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Tài khoản')
	username!: string;

	@ApiProperty()
	@I18nIsString()
	@I18nIsNotEmpty()
	@Property('Mật khẩu')
	password!: string;
}
