import { AgencyRepository } from './agency.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { AgencyTypeormEntity } from '../entities/agency.typeorm.entity';

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
}
