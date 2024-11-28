import { Injectable } from '@nestjs/common';
import {
	CreateCustomerRoleDto,
	CustomerRoleEntity,
	CustomerRoleRepository
} from '@lib/modules/customer-role';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateCustomerRoleUseCase extends ExecuteHandler<CustomerRoleEntity> {
	constructor(private readonly customerRoleRepository: CustomerRoleRepository) {
		super();
	}

	async execute(data: CreateCustomerRoleDto): Promise<CustomerRoleEntity> {
		return this.customerRoleRepository.create({ data });
	}
}
