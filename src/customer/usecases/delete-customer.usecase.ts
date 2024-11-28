import { Injectable } from '@nestjs/common';
import { CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteCustomerUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(private readonly customerRepository: CustomerRepository) {
		super();
	}

	async execute(id: string): Promise<CustomerEntity> {
		return this.customerRepository.softDeleteById({ id });
	}
}
