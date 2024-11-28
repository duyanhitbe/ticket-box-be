import { CustomerRepository } from './customer.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { CustomerTypeormEntity } from '../entities/customer.typeorm.entity';

@Repository(CustomerTypeormEntity)
export class CustomerTypeormRepository
	extends BaseTypeormRepository<CustomerTypeormEntity>
	implements CustomerRepository {}
