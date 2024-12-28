import { EventRepository } from './event.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { EventTypeormEntity } from '../entities/event.typeorm.entity';
import { PaginationResponse } from '@lib/base/dto';
import { getMeta, getPageLimitOffset } from '@lib/common/helpers';
import { FilterEventDto } from '@lib/modules/event';
import { Brackets } from 'typeorm';

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

	async findPaginated(filter: FilterEventDto): Promise<PaginationResponse<EventTypeormEntity>> {
		const { eventType, name, search } = filter;
		const { limit, offset } = getPageLimitOffset(filter);

		const queryBuilder = this.repository
			.createQueryBuilder('event')
			.select([
				'event.id AS "id"',
				'event.created_at AS "createdAt"',
				'event.updated_at AS "updatedAt"',
				'event.deleted_at AS "deletedAt"',
				'event.status AS "status"',
				'event.name AS "name"',
				'event.event_type AS "eventType"',
				'event.image AS "image"',
				'event.thumbnail AS "thumbnail"',
				'event.description AS "description"',
				'event.rating_star AS "ratingStar"',
				'event.display_price AS "displayPrice"',
				'event.is_banner AS "isBanner"',
				'event.order AS "order"',
				'event.location AS "location"',
				'(SELECT COUNT(id)::int FROM ticket_groups tg WHERE tg.event_id = event.id) AS "ticketGroupCount"'
			]);

		if (eventType) {
			queryBuilder.where('event.type = :eventType', { eventType });
		}

		if (name) {
			queryBuilder.andWhere(`event.name ILIKE '%${name}%'`);
		}

		if (search) {
			const searchFields = ['name', 'location'];
			queryBuilder.andWhere(
				new Brackets((qb) => {
					searchFields.forEach((field) => {
						qb.orWhere(`event.${field} ILIKE '%${search}%'`);
					});
				})
			);
		}

		const [data, count] = await Promise.all([
			queryBuilder.limit(limit).offset(offset).getRawMany(),
			queryBuilder.getCount()
		]);
		const meta = getMeta(filter, count);

		return { data, meta };
	}
}
