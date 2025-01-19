import { TicketGroupRepository } from './ticket-group.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketGroupTypeormEntity } from '../entities/ticket-group.typeorm.entity';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import {
	FilterTicketGroupByEventDto,
	RawTicketGroupByEventEntity,
	TicketGroupDetailEntity,
	TicketGroupMinMax
} from '@lib/modules/ticket-group';
import { getStartAndEndOfDay } from '@lib/common/helpers';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

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

	async findMinMaxDuration(eventId: string): Promise<TicketGroupMinMax> {
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

	async findMinMaxMixed(eventId: string): Promise<TicketGroupMinMax> {
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

	//prettier-ignore
	async findPaginatedByEvent(
		filter: FilterTicketGroupByEventDto,
		agencyLevelId?: string
	): Promise<RawTicketGroupByEventEntity[]> {
		const { eventId, date } = filter;
		const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

		return this.repository.query(`
            WITH ticket_info AS (
            	SELECT t.id, t.name, t.quantity, t.ticket_group_id, tp.base_price, tp.discounted_price, t.order
                FROM ticket_infos t
                LEFT JOIN ticket_prices tp ON tp.ticket_info_id = t.id AND ${agencyLevelId ? `tp.agency_level_id = '${agencyLevelId}'` : `tp.agency_level_id IS NULL`} AND tp.deleted_at IS NULL
				WHERE t.deleted_at IS NULL AND t.status = '${ENUM_STATUS.ACTIVE}'
			)
            SELECT tg.id, tg.name, tg.description, tf.id AS "ticketInfoId", tf.order::int AS "ticketInfoOrder", tf.name AS "ticketInfoName", tf.quantity::int AS "ticketInfoQuantity", tf.base_price::int AS "ticketInfoBasePrice", tf.discounted_price::int AS "ticketInfoDiscountedPrice"
            FROM ticket_groups tg
			LEFT JOIN ticket_group_dates tgd ON tgd.ticket_group_id = tg.id AND tgd.deleted_at IS NULL
			LEFT JOIN ticket_info tf ON tf.ticket_group_id = tg.id
            WHERE (
                tg.event_id = '${eventId}' AND tg.status = '${ENUM_STATUS.ACTIVE}' AND
                (tg.from_date <= '${startOfDay.toISOString()}' AND tg.to_date >= '${startOfDay.toISOString()}') OR
                (tgd.date BETWEEN '${startOfDay.toISOString()}' AND '${endOfDay.toISOString()}')
            ) AND (tg.deleted_at IS NULL)
            ORDER BY tg.created_at DESC, "ticketInfoOrder" ASC;
		`)
	}

	async detail(id: string): Promise<TicketGroupDetailEntity> {
		const ticketGroup = await this.findByIdOrThrow({
			id,
			relations: ['dates']
		});

		const result = new TicketGroupDetailEntity();
		Object.assign(result, ticketGroup);

		result.dates = ticketGroup.dates?.map((item) => item.date);

		return result;
	}
}
