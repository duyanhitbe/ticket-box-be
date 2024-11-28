import { Injectable } from '@nestjs/common';
import { CustomerRoleEntity, CustomerRoleRepository } from '@lib/modules/customer-role';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteCustomerRoleUseCase extends ExecuteHandler<CustomerRoleEntity> {
	constructor(private readonly customerRoleRepository: CustomerRoleRepository) {
		super();
	}

	async execute(id: string): Promise<CustomerRoleEntity> {
		return this.customerRoleRepository.softDeleteById({ id });
	}
}
