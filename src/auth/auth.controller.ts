import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SwaggerOkResponse } from '@lib/common/decorators';
import {
	LoginCustomerDto,
	LoginCustomerEntity,
	LoginUserDto,
	LoginUserEntity
} from '@lib/modules/auth';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { LoginCustomerUseCase } from './usecases/login-customer.usecase';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly loginUserUseCase: LoginUserUseCase,
		private readonly loginCustomerUseCase: LoginCustomerUseCase
	) {}

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

	/**
	 * @path POST /api/v1/auth/customer/login
	 * @param data {LoginCustomerDto}
	 * @returns Promise<LoginCustomerEntity>
	 */
	@Post('customer/login')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login customer', type: LoginCustomerEntity })
	loginCustomer(@Body() data: LoginCustomerDto): Promise<LoginCustomerEntity> {
		return this.loginCustomerUseCase.execute(data);
	}
}
