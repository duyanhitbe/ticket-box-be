import { CustomerRepository } from './customer.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { CustomerTypeormEntity } from '../entities/customer.typeorm.entity';
import { CustomerEntity, FilterCustomerDto } from '@lib/modules/customer';
import { Argon2Service } from '@lib/core/hash';
import { PaginationResponse } from '@lib/base/dto';
import { getMeta } from '@lib/common/helpers';

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

	async findPaginated(
		filter: FilterCustomerDto
	): Promise<PaginationResponse<CustomerTypeormEntity>> {
		const { searchFields, search } = filter;

		const queryBuilder = this.repository
			.createQueryBuilder('c')
			.select([
				'c.id as "id"',
				'c.created_at as "createdAt"',
				'c.updated_at as "updatedAt"',
				'c.status as "status"',
				'c.customer_role_id as "customerRoleId"',
				'c.name as "name"',
				'c.phone as "phone"',
				'c.email as "email"',
				'c.allow_debt_purchase as "allowDebtPurchase"',
				'r.name as "customerRoleName"'
			])
			.leftJoin('customer_roles', 'r', 'r.id = c.customer_role_id')
			.where('c.is_agency = FALSE');

		const countQueryBuilder = this.repository
			.createQueryBuilder('c')
			.where('c.is_agency = FALSE');

		this.addSearchFields(queryBuilder, 'c', searchFields, search);
		this.addSearchFields(countQueryBuilder, 'c', searchFields, search);

		const [data, count] = await Promise.all([
			queryBuilder.getRawMany(),
			countQueryBuilder.getCount()
		]);
		const meta = getMeta(filter, count);
		return {
			data,
			meta
		};
	}
}
