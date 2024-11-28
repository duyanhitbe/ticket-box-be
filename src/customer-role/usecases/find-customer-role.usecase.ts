import { Injectable } from '@nestjs/common';
import {
	CustomerRoleEntity,
	CustomerRoleRepository,
	FilterCustomerRoleDto
} from '@lib/modules/customer-role';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindCustomerRoleUseCase extends QueryHandler<PaginationResponse<CustomerRoleEntity>> {
	constructor(private readonly customerRoleRepository: CustomerRoleRepository) {
		super();
	}

	async query(filter: FilterCustomerRoleDto): Promise<PaginationResponse<CustomerRoleEntity>> {
		return this.customerRoleRepository.findPaginated(filter);
	}
}
