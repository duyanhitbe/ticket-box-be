import { PaginationResponse } from '@lib/base/dto';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { getMeta } from '@lib/common/helpers';
import { Repository } from '@lib/core/typeorm';
import { CustomerTypeormEntity, FilterCustomerDto } from '../../customer';
import { AgencyUserRepository } from './agency-user.repository.abstract';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

@Repository(CustomerTypeormEntity)
export class AgencyUserTypeormRepository
	extends BaseTypeormRepository<CustomerTypeormEntity>
	implements AgencyUserRepository
{
	async findPaginated(
		filter: FilterCustomerDto
	): Promise<PaginationResponse<CustomerTypeormEntity>> {
		const { searchFields, search, status, user } = filter;

		const queryBuilder = this.repository
			.createQueryBuilder('c')
			.select([
				'c.id as "id"',
				'c.created_at as "createdAt"',
				'c.updated_at as "updatedAt"',
				'c.status as "status"',
				'c.name as "name"',
				'c.phone as "phone"',
				'c.email as "email"',
				'c.allow_debt_purchase as "allowDebtPurchase"',
				'c.agency_id as "agencyId"',
				'a.name as "agencyName"',
				'l.level as "agencyLevel"',
				'l.name as "agencyLevelName"'
			])
			.leftJoin('agencies', 'a', 'a.id = c.agency_id')
			.leftJoin('agency_levels', 'l', 'l.id = c.agency_level_id')
			.where('c.is_agency = TRUE');

		const countQueryBuilder = this.repository
			.createQueryBuilder('c')
			.where('c.is_agency = TRUE');

		if (status) {
			queryBuilder.andWhere('c.status = :status', { status });
			countQueryBuilder.andWhere('c.status = :status', { status });
		}

		if (user?.role === ENUM_TOKEN_ROLE.AGENCY && user?.agencyId) {
			queryBuilder.andWhere('c.agency_id = :agencyId', { agencyId: user.agencyId });
			countQueryBuilder.andWhere('c.agency_id = :agencyId', { agencyId: user.agencyId });
		}

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
