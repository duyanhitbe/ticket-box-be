import { Injectable } from '@nestjs/common';
import { FilterCustomerDto, CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindCustomerUseCase extends QueryHandler<PaginationResponse<CustomerEntity>> {
	constructor(private readonly customerRepository: CustomerRepository) {
		super();
	}

	async query(filter: FilterCustomerDto): Promise<PaginationResponse<CustomerEntity>> {
		return this.customerRepository.findPaginated(filter);
	}
}
