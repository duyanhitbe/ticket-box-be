import { Injectable } from '@nestjs/common';
import { CustomerEntity, CustomerRepository, FilterCustomerDto } from '@lib/modules/customer';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindCustomerUseCase extends QueryHandler<PaginationResponse<CustomerEntity>> {
	constructor(private readonly customerRepository: CustomerRepository) {
		super();
	}

	async query(filter: FilterCustomerDto): Promise<PaginationResponse<CustomerEntity>> {
		filter.searchFields = ['name', 'email', 'phone'];
		return this.customerRepository.findPaginated(filter);
	}
}
