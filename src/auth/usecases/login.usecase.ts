import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, LoginEntity } from '@lib/modules/auth';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { ExecuteHandler } from '@lib/common/abstracts';
import { LoginCustomerUseCase } from './login-customer.usecase';
import { LoginUserUseCase } from './login-user.usecase';
import { LoginAgencyUseCase } from './login-agency.usecase';

@Injectable()
export class LoginUseCase extends ExecuteHandler<LoginEntity> {
	constructor(
		private readonly loginCustomerUseCase: LoginCustomerUseCase,
		private readonly loginAgencyUseCase: LoginAgencyUseCase,
		private readonly loginUserUseCase: LoginUserUseCase
	) {
		super();
	}

	async execute(data: LoginDto): Promise<LoginEntity> {
		const { type, username, password } = data;

		switch (type) {
			case ENUM_TOKEN_ROLE.USER:
				return this.loginUserUseCase.execute({ username, password });
			case ENUM_TOKEN_ROLE.CUSTOMER:
				return this.loginCustomerUseCase.execute({
					phone: username,
					password
				});
			case ENUM_TOKEN_ROLE.AGENCY:
				return this.loginAgencyUseCase.execute({
					phone: username,
					password
				});
			default:
				throw new BadRequestException('Invalid login credentials');
		}
	}
}
