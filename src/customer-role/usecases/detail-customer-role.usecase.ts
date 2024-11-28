import { Injectable } from '@nestjs/common';
import { CustomerRoleEntity, CustomerRoleRepository } from '@lib/modules/customer-role';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailCustomerRoleUseCase extends QueryHandler<CustomerRoleEntity> {
	constructor(private readonly customerRoleRepository: CustomerRoleRepository) {
		super();
	}

	async query(id: string): Promise<CustomerRoleEntity> {
		return this.customerRoleRepository.findByIdOrThrow({ id });
	}
}
