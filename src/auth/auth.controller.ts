import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SwaggerOkResponse } from '@lib/common/decorators';
import { LoginUserDto, LoginUserEntity } from '@lib/modules/auth';
import { LoginUserUseCase } from './usecases/login-user.usecase';

@Controller('auth')
export class AuthController {
	constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

	/**
	 * @path POST /api/v1/auth/user/login
	 * @param data {LoginUserDto}
	 * @returns Promise<LoginUserEntity>
	 */
	@Post('user/login')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login user', type: LoginUserEntity })
	loginUser(@Body() data: LoginUserDto): Promise<LoginUserEntity> {
		return this.loginUserUseCase.execute(data);
	}
}
