import { BaseRepository } from '@lib/base/repositories';
import { CustomerEntity } from '../entities/customer.entity.abstract';

export abstract class CustomerRepository extends BaseRepository<CustomerEntity> {
	abstract getCustomerForCreateOrder(
		data: Pick<CustomerEntity, 'name' | 'phone' | 'email' | 'customerRoleId'>
	): Promise<CustomerEntity>;
}
