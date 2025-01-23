import { AgencyRepository } from './agency.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { AgencyTypeormEntity } from '../entities/agency.typeorm.entity';
import { PaginationResponse } from '@lib/base/dto';
import { getMeta } from '@lib/common/helpers';
import { FilterAgencyDto } from '../dto/filter-agency.dto';

@Repository(AgencyTypeormEntity)
export class AgencyTypeormRepository
	extends BaseTypeormRepository<AgencyTypeormEntity>
	implements AgencyRepository
{
	async replaceEvents(id: string, eventIds: string[]): Promise<void> {
		await this.repository.query(`
            DELETE
            FROM agency_event
            WHERE agency_id = '${id}'
		`);
		await Promise.all(
			eventIds.map(async (eventId) => {
				await this.repository.query(`
                    INSERT INTO agency_event(event_id, agency_id)
                    VALUES ('${eventId}', '${id}')
				`);
			})
		);
	}

	async findPaginated(filter: FilterAgencyDto): Promise<PaginationResponse<AgencyTypeormEntity>> {
		const { searchFields, search, agencyLevelId } = filter;

		const queryBuilder = this.repository
			.createQueryBuilder('a')
			.select([
				'a.id as "id"',
				'a.created_at as "createdAt"',
				'a.updated_at as "updatedAt"',
				'a.status as "status"',
				'a.name as "name"',
				'a.phone as "phone"',
				'a.address as "address"',
				'a.agency_level_id as "agencyLevelId"',
				'l.name as "agencyLevelName"',
				'l.level as "agencyLevel"'
			])
			.leftJoin('agency_levels', 'l', 'l.id = a.agency_level_id');

		const countQueryBuilder = this.repository.createQueryBuilder('a');

		if (agencyLevelId) {
			queryBuilder.where('a.agency_level_id = :agencyLevelId', { agencyLevelId });
			countQueryBuilder.where('a.agency_level_id = :agencyLevelId', { agencyLevelId });
		}

		this.addSearchFields(queryBuilder, 'a', searchFields, search);
		this.addSearchFields(countQueryBuilder, 'a', searchFields, search);

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
