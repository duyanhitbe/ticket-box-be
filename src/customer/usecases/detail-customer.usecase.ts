import { Injectable } from '@nestjs/common';
import { CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailCustomerUseCase extends QueryHandler<CustomerEntity> {
	constructor(private readonly customerRepository: CustomerRepository) {
		super();
	}

	async query(id: string): Promise<CustomerEntity> {
		return this.customerRepository.findByIdOrThrow({ id });
	}
}
