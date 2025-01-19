import { Injectable } from '@nestjs/common';
import { LoginCustomerDto, LoginCustomerEntity } from '@lib/modules/auth';
import { ACCESS_TOKEN_EXPIRES, ENUM_TOKEN_ROLE, JwtService } from '@lib/core/jwt';
import { I18nExceptionService } from '@lib/core/i18n';
import { HashService } from '@lib/core/hash';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerRepository } from '@lib/modules/customer';

@Injectable()
export class LoginAgencyUseCase extends ExecuteHandler<LoginCustomerEntity> {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JwtService,
		private readonly i18nExceptionService: I18nExceptionService,
		private readonly hashService: HashService
	) {
		super();
	}

	async execute(data: LoginCustomerDto): Promise<LoginCustomerEntity> {
		const { phone, password } = data;

		const agency = await this.customerRepository.findAgencyByPhone(phone);

		const comparePassword = await this.hashService.verify(agency.password, password);
		if (!comparePassword) {
			this.i18nExceptionService.throwWrongPassword();
		}

		const expiresIn = ACCESS_TOKEN_EXPIRES;
		const accessToken = await this.jwtService.sign(
			agency.id,
			ENUM_TOKEN_ROLE.AGENCY,
			expiresIn
		);

		return {
			accessToken,
			expiresIn
		};
	}
}
