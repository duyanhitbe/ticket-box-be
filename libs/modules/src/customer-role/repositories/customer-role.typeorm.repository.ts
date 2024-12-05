import { CustomerRoleRepository } from './customer-role.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { CustomerRoleTypeormEntity } from '../entities/customer-role.typeorm.entity';
import { ENUM_CUSTOMER_ROLE_CODE } from '@lib/modules/customer-role';
import { NotFoundException } from '@nestjs/common';

@Repository(CustomerRoleTypeormEntity)
export class CustomerRoleTypeormRepository
	extends BaseTypeormRepository<CustomerRoleTypeormEntity>
	implements CustomerRoleRepository
{
	async getNormalCustomerRoleId(): Promise<string> {
		const normalCustomerRole = await this.findOne({
			where: {
				code: ENUM_CUSTOMER_ROLE_CODE.NORMAL_CUSTOMER
			},
			select: ['id']
		});
		if (!normalCustomerRole) {
			throw new NotFoundException(`Customer Role Not Found`);
		}
		return normalCustomerRole.id;
	}
}
