import { TicketGroupRepository } from './ticket-group.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketGroupTypeormEntity } from '../entities/ticket-group.typeorm.entity';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { FilterTicketGroupDto, TicketGroupEntity } from '@lib/modules/ticket-group';
import { PaginationResponse } from '@lib/base/dto';
import { getMeta, getOffset, getStartAndEndOfDay } from '@lib/common/helpers';

@Repository(TicketGroupTypeormEntity)
export class TicketGroupTypeormRepository
	extends BaseTypeormRepository<TicketGroupTypeormEntity>
	implements TicketGroupRepository
{
	async findDateTypeByEventId(eventId: string): Promise<ENUM_DATE_TYPE[]> {
		const res = await this.repository
			.createQueryBuilder('tg')
			.select(['date_type as "dateType"'])
			.where(`event_id = :eventId`, { eventId })
			.groupBy('date_type')
			.getRawMany();
		return res.map((item) => item.dateType);
	}

	async findMinMaxDuration(eventId: string): Promise<{ fromDate: Date; toDate: Date } | null> {
		const res = await this.repository
			.createQueryBuilder('tg')
			.select([`MIN(tg.from_date) as "fromDate"`, `MAX(tg.to_date) as "toDate"`])
			.where(`event_id = :eventId`, { eventId })
			.getRawMany();
		if (!res[0]) return null;

		return {
			fromDate: res[0].fromDate,
			toDate: res[0].toDate
		};
	}

	async findMinMaxMixed(eventId: string): Promise<{ fromDate: Date; toDate: Date } | null> {
		const res = await this.repository
			.createQueryBuilder('tg')
			.select([
				`MIN(tg.from_date) as "minFromDate"`,
				`MAX(tg.to_date) as "maxToDate"`,
				`MIN(tgd.date) as "minDate"`,
				`MAX(tgd.date) as "maxDate"`
			])
			.leftJoin('ticket_group_dates', 'tgd', 'tgd.ticket_group_id = tg.id')
			.where(`tg.event_id = :eventId`, { eventId })
			.getRawMany();
		if (!res[0]) return null;

		const minFromDate = new Date(res[0].minFromDate);
		const maxToDate = new Date(res[0].maxToDate);
		const minDate = new Date(res[0].minDate);
		const maxDate = new Date(res[0].maxDate);

		return {
			fromDate: minFromDate.getTime() < minDate.getTime() ? minFromDate : minDate,
			toDate: maxToDate.getTime() > maxDate.getTime() ? maxToDate : maxDate
		};
	}

	async findAllPaginated(
		filter: FilterTicketGroupDto
	): Promise<PaginationResponse<TicketGroupEntity>> {
		const { eventId, date } = filter;
		const limit = +(filter.limit || 25);
		const page = +(filter.page || 1);

		const offset = getOffset(limit, page);
		const queryBuilder = this.repository
			.createQueryBuilder('tg')
			.select([
				'tg.id as "id"',
				'tg.created_at as "createdAt"',
				'tg.updated_at as "updatedAt"',
				'tg.deleted_at as "deletedAt"',
				'tg.status as "status"',
				'tg.event_id as "eventId"',
				'tg.name as "name"',
				'tg.description as "description"',
				'tg.date_type as "dateType"',
				'tg.from_date as "fromDate"',
				'tg.to_date as "toDate"'
			])
			.orderBy('tg.created_at', 'DESC');

		if (eventId) {
			queryBuilder.where(`tg.event_id = :eventId`, { eventId });
		}

		if (date) {
			const { startOfDay, endOfDay } = getStartAndEndOfDay(date);
			queryBuilder
				.leftJoin('ticket_group_dates', 'tgd', 'tgd.ticket_group_id = tg.id')
				.where(`(tg.from_date <= :startOfDay AND tg.to_date >= :endOfDay)`, {
					startOfDay,
					endOfDay
				})
				.orWhere(`(tgd.date BETWEEN :startOfDay AND :endOfDay)`, { startOfDay, endOfDay });
		}

		const [data, totalItem] = await Promise.all([
			queryBuilder.limit(limit).offset(offset).getRawMany(),
			queryBuilder.getCount()
		]);
		const meta = getMeta(limit, page, totalItem);

		return {
			data,
			meta: meta as any
		};
	}
}
