import { Body, Controller, Get, HttpCode, Logger, Post, Req, Res } from '@nestjs/common';
import { SwaggerOkResponse, UseAuth, User } from '@lib/common/decorators';
import { LoginCustomerDto, LoginDto, LoginEntity, RegisterCustomerDto } from '@lib/modules/auth';
import { Request, Response } from 'express';
import { RequestUser } from '@lib/common/interfaces';
import { DetailUserUseCase } from '../user/usecases/detail-user.usecase';
import { UserEntity } from '@lib/modules/user';
import { CustomerEntity } from '@lib/modules/customer';
import { DetailCustomerUseCase } from '../customer/usecases/detail-customer.usecase';
import { ONLY_CUSTOMER_ROLE, ONLY_USER_ROLE } from '@lib/core/jwt';
import { LoginUseCase } from './usecases/login.usecase';
import { LoginCustomerUseCase } from './usecases/login-customer.usecase';
import { RegisterCustomerUseCase } from './usecases/register-customer.usecase';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly loginCustomerUseCase: LoginCustomerUseCase,
		private readonly detailUserUseCase: DetailUserUseCase,
		private readonly detailCustomerUseCase: DetailCustomerUseCase,
		private readonly registerCustomerUseCase: RegisterCustomerUseCase
	) {}

	/**
	 * @path POST /api/v1/auth/login
	 * @param data {LoginDto}
	 * @returns Promise<LoginEntity>
	 */
	@Post('login')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login', type: LoginEntity })
	async login(@Body() data: LoginDto): Promise<LoginEntity> {
		return await this.loginUseCase.execute(data);
	}

	/**
	 * @path POST /api/v1/auth/login/customer
	 * @param data {LoginCustomerDto}
	 * @returns Promise<LoginEntity>
	 */
	@Post('login/customer')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login customer', type: LoginEntity })
	async loginCustomer(@Body() data: LoginCustomerDto): Promise<LoginEntity> {
		return await this.loginCustomerUseCase.execute(data);
	}

	/**
	 * @path POST /api/v1/auth/logout
	 * @returns Promise<void>
	 */
	@UseAuth()
	@Post('logout')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Logout', type: String })
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		req.session.destroy(() => {});
		res.clearCookie('session');
		return 'success';
	}

	/**
	 * @path GET /api/v1/auth/user
	 * @returns Promise<UserEntity>
	 */
	@UseAuth({ roles: ONLY_USER_ROLE })
	@Get('user')
	@SwaggerOkResponse({ summary: 'Get user info', type: UserEntity })
	async getUserInfo(@User() user: RequestUser) {
		return this.detailUserUseCase.query(user!.id);
	}

	/**
	 * @path GET /api/v1/auth/customer
	 * @returns Promise<CustomerEntity>
	 */
	@UseAuth({ roles: ONLY_CUSTOMER_ROLE })
	@Get('customer')
	@SwaggerOkResponse({ summary: 'Get customer info', type: CustomerEntity })
	async getCustomerInfo(@User() user: RequestUser) {
		return this.detailCustomerUseCase.query(user!.id);
	}

	/**
	 * @path POST /api/v1/auth/register/customer
	 * @param data {RegisterCustomerDto}
	 * @returns Promise<CustomerEntity>
	 */
	@Post('register/customer')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Register customer', type: CustomerEntity })
	async registerCustomer(@Body() data: RegisterCustomerDto): Promise<CustomerEntity> {
		return await this.registerCustomerUseCase.execute(data);
	}
}
