import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto, CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateCustomerUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(private readonly customerRepository: CustomerRepository) {
		super();
	}

	async execute(id: string, data: UpdateCustomerDto): Promise<CustomerEntity> {
		return this.customerRepository.updateById({ id, data });
	}
}
