import { EventRepository } from './event.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { EventTypeormEntity } from '../entities/event.typeorm.entity';
import { FilterEventDto } from '../dto/filter-event.dto';
import { set } from 'lodash';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { In } from 'typeorm';

@Repository(EventTypeormEntity)
export class EventTypeormRepository
	extends BaseTypeormRepository<EventTypeormEntity>
	implements EventRepository
{
	async findLocation(): Promise<string[]> {
		const res = await this.repository
			.createQueryBuilder('e')
			.select('location')
			.groupBy('location')
			.getRawMany();

		return res
			.map((event) => event.location)
			.filter((location) => Boolean(location)) as string[];
	}

	async findPaginated(filter: FilterEventDto) {
		const { eventType, isWebClient, user } = filter;

		filter.searchFields = ['name', 'location'];
		if (eventType) {
			set(filter, 'where.eventType', eventType);
		}

		if (isWebClient === 'true') {
			set(filter, 'where.status', ENUM_STATUS.ACTIVE);
		}

		if (user?.role === ENUM_TOKEN_ROLE.AGENCY && user?.eventIds?.length) {
			set(filter, 'where.id', In(user.eventIds));
		}

		return super.findPaginated(filter);
	}
}
