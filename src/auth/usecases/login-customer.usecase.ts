import { Injectable } from '@nestjs/common';
import { LoginCustomerDto, LoginCustomerEntity } from '@lib/modules/auth';
import { ENUM_TOKEN_ROLE, JwtService } from '@lib/core/jwt';
import { I18nExceptionService } from '@lib/core/i18n';
import { HashService } from '@lib/core/hash';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerEntity, CustomerRepository } from '@lib/modules/customer';

@Injectable()
export class LoginCustomerUseCase extends ExecuteHandler<LoginCustomerEntity> {
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

		const customer = await this.customerRepository.findOne({
			where: { phone }
		});
		if (!customer) {
			this.i18nExceptionService.throwNotFoundEntity(CustomerEntity.name);
		}

		const comparePassword = await this.hashService.verify(customer.password, password);
		if (!comparePassword) {
			this.i18nExceptionService.throwWrongPassword();
		}

		const expiresIn = 60 * 60 * 24;
		const accessToken = await this.jwtService.sign(
			customer.id,
			ENUM_TOKEN_ROLE.CUSTOMER,
			expiresIn
		);

		return {
			accessToken,
			expiresIn
		};
	}
}
