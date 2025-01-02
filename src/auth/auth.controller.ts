import { Body, Controller, Get, HttpCode, Logger, Post, Req, Res } from '@nestjs/common';
import { SwaggerOkResponse, UseAuth, User } from '@lib/common/decorators';
import {
	LoginCustomerDto,
	LoginCustomerEntity,
	LoginUserDto,
	LoginUserEntity
} from '@lib/modules/auth';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { LoginCustomerUseCase } from './usecases/login-customer.usecase';
import { Request, Response } from 'express';
import { RequestUser } from '@lib/common/interfaces';
import { DetailUserUseCase } from '../user/usecases/detail-user.usecase';
import { UserEntity } from '@lib/modules/user';
import { CustomerEntity } from '@lib/modules/customer';
import { DetailCustomerUseCase } from '../customer/usecases/detail-customer.usecase';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly loginUserUseCase: LoginUserUseCase,
		private readonly loginCustomerUseCase: LoginCustomerUseCase,
		private readonly detailUserUseCase: DetailUserUseCase,
		private readonly detailCustomerUseCase: DetailCustomerUseCase
	) {}

	/**
	 * @path POST /api/v1/auth/user/login
	 * @param data {LoginUserDto}
	 * @param req
	 * @returns Promise<LoginUserEntity>
	 */
	@Post('user/login')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login user', type: LoginUserEntity })
	async loginUser(@Body() data: LoginUserDto, @Req() req: Request): Promise<LoginUserEntity> {
		const result = await this.loginUserUseCase.execute(data);
		req.session['accessToken'] = result.accessToken;
		return result;
	}

	/**
	 * @path POST /api/v1/auth/customer/login
	 * @param data {LoginCustomerDto}
	 * @returns Promise<LoginCustomerEntity>
	 */
	@Post('customer/login')
	@HttpCode(200)
	@SwaggerOkResponse({ summary: 'Login customer', type: LoginCustomerEntity })
	async loginCustomer(@Body() data: LoginCustomerDto): Promise<LoginCustomerEntity> {
		return this.loginCustomerUseCase.execute(data);
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
	@UseAuth({ roles: [ENUM_TOKEN_ROLE.USER] })
	@Get('user')
	@SwaggerOkResponse({ summary: 'Get user info', type: UserEntity })
	async getUserInfo(@User() user: RequestUser) {
		return this.detailUserUseCase.query(user!.id);
	}

	/**
	 * @path GET /api/v1/auth/customer
	 * @returns Promise<CustomerEntity>
	 */
	@UseAuth({ roles: [ENUM_TOKEN_ROLE.CUSTOMER] })
	@Get('customer')
	@SwaggerOkResponse({ summary: 'Get customer info', type: CustomerEntity })
	async getCustomerInfo(@User() user: RequestUser) {
		return this.detailCustomerUseCase.query(user!.id);
	}
}
