import { TicketGroupRepository } from './ticket-group.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketGroupTypeormEntity } from '../entities/ticket-group.typeorm.entity';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { FilterTicketGroupByEventDto, TicketGroupByEventEntity } from '@lib/modules/ticket-group';
import { getStartAndEndOfDay } from '@lib/common/helpers';

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

	async findPaginatedByEvent(
		filter: FilterTicketGroupByEventDto
	): Promise<TicketGroupByEventEntity[]> {
		const { eventId, date } = filter;
		const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

		const queryBuilder = this.repository
			.createQueryBuilder('tg')
			.select(['tg.id as "id"', 'tg.name as "name"', 'tg.description as "description"'])
			.leftJoin('ticket_group_dates', 'tgd', 'tgd.ticket_group_id = tg.id')
			.where(`tg.event_id = :eventId`, { eventId })
			.andWhere(
				`(tg.from_date >= '${startOfDay.toISOString()}' AND tg.to_date >= '${endOfDay.toISOString()}')`
			)
			.orWhere(
				`(tgd.date BETWEEN '${startOfDay.toISOString()}' AND '${endOfDay.toISOString()}')`
			)
			.orderBy('tg.created_at', 'DESC');

		return queryBuilder.getRawMany();
	}
}
