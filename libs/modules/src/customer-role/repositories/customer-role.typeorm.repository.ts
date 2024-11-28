import { CustomerRoleRepository } from './customer-role.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { CustomerRoleTypeormEntity } from '../entities/customer-role.typeorm.entity';

@Repository(CustomerRoleTypeormEntity)
export class CustomerRoleTypeormRepository
	extends BaseTypeormRepository<CustomerRoleTypeormEntity>
	implements CustomerRoleRepository {}
