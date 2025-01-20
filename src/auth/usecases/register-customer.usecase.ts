import { Injectable } from '@nestjs/common';
import { RegisterCustomerDto } from '@lib/modules/auth';
import { I18nExceptionService } from '@lib/core/i18n';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerEntity, CustomerRepository } from '@lib/modules/customer';

@Injectable()
export class RegisterCustomerUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly i18nExceptionService: I18nExceptionService
	) {
		super();
	}

	async execute(data: RegisterCustomerDto): Promise<CustomerEntity> {
		const { phone } = data;

		const exist = await this.customerRepository.exists({
			where: { phone }
		});
		if (exist) {
			this.i18nExceptionService.throwExists('Số điện thoại');
		}

		return this.customerRepository.create({ data });
	}
}
