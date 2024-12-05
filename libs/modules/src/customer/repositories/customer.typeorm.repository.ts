import { CustomerRepository } from './customer.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { CustomerTypeormEntity } from '../entities/customer.typeorm.entity';
import { CustomerEntity } from '@lib/modules/customer';
import { Argon2Service } from '@lib/core/hash';

@Repository(CustomerTypeormEntity)
export class CustomerTypeormRepository
	extends BaseTypeormRepository<CustomerTypeormEntity>
	implements CustomerRepository
{
	async getCustomerForCreateOrder(
		data: Pick<CustomerEntity, 'name' | 'phone' | 'email' | 'customerRoleId'>
	): Promise<CustomerEntity> {
		const { name, phone, email, customerRoleId } = data;

		const exist = await this.findOne({
			where: { phone },
			select: ['id', 'name', 'phone', 'email']
		});
		if (exist) {
			const data = { name, email };
			Object.assign(exist, data);
			this.logger.log('Updated exists customer');
			await this.repository.update(exist.id, data);
			return exist;
		}

		const hashService = new Argon2Service();
		const password = await hashService.hash(phone);
		const newCustomer = await this.repository
			.createQueryBuilder()
			.insert()
			.into(this.repository.target)
			.values({
				name,
				phone,
				password,
				email,
				customerRoleId
			})
			.returning('id, name, phone, email') // Add RETURNING clause
			.execute();

		// Extract and return the first row of the inserted data
		this.logger.log('Created a new customer');
		this.logger.debug(newCustomer.raw[0]);
		return newCustomer.raw[0];
	}
}
