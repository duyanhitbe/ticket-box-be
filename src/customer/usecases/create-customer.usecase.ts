import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateCustomerUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(private readonly customerRepository: CustomerRepository) {
		super();
	}

	async execute(data: CreateCustomerDto): Promise<CustomerEntity> {
		return this.customerRepository.create({ data });
	}
}
