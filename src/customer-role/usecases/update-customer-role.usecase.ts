import { Injectable } from '@nestjs/common';
import {
	CustomerRoleEntity,
	CustomerRoleRepository,
	UpdateCustomerRoleDto
} from '@lib/modules/customer-role';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateCustomerRoleUseCase extends ExecuteHandler<CustomerRoleEntity> {
	constructor(private readonly customerRoleRepository: CustomerRoleRepository) {
		super();
	}

	async execute(id: string, data: UpdateCustomerRoleDto): Promise<CustomerRoleEntity> {
		return this.customerRoleRepository.updateById({ id, data });
	}
}
