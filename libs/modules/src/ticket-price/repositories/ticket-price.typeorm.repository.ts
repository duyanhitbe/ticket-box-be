import { TicketPriceRepository } from './ticket-price.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketPriceTypeormEntity } from '../entities/ticket-price.typeorm.entity';
import { PaginationResponse } from '@lib/base/dto';
import { FilterTicketPriceDto } from '@lib/modules/ticket-price';
import { getMeta, getPageLimitOffset } from '@lib/common/helpers';

@Repository(TicketPriceTypeormEntity)
export class TicketPriceTypeormRepository
	extends BaseTypeormRepository<TicketPriceTypeormEntity>
	implements TicketPriceRepository
{
	async findPaginated(
		filter: FilterTicketPriceDto
	): Promise<PaginationResponse<TicketPriceTypeormEntity>> {
		const { eventId, ticketGroupId, customerRoleId } = filter;
		const { limit, offset } = getPageLimitOffset(filter);

		const queryBuilder = this.repository
			.createQueryBuilder('p')
			.select([
				'p.id AS "id"',
				'p.created_at AS "createdAt"',
				'p.updated_at AS "updatedAt"',
				'p.status AS "status"',
				'p.base_price AS "basePrice"',
				'p.discount_type AS "discountType"',
				'p.discount_value AS "discountValue"',
				'p.discounted_price AS "discountedPrice"',
				'e.name AS "eventName"',
				'tg.name AS "ticketGroupName"',
				'tf.name AS "ticketInfoName"'
			])
			.leftJoin('events', 'e', 'e.id = p.event_id')
			.leftJoin('ticket_groups', 'tg', 'tg.id = p.ticket_group_id')
			.leftJoin('ticket_infos', 'tf', 'tf.id = p.ticket_info_id')
			.limit(limit)
			.offset(offset);
		const countQueryBuilder = this.repository.createQueryBuilder('p');

		if (eventId) {
			queryBuilder.andWhere('p.event_id = :eventId', { eventId });
			countQueryBuilder.andWhere('p.event_id = :eventId', { eventId });
		}
		if (ticketGroupId) {
			queryBuilder.andWhere('p.ticket_group_id = :ticketGroupId', { ticketGroupId });
			countQueryBuilder.andWhere('p.ticket_group_id = :ticketGroupId', { ticketGroupId });
		}
		if (customerRoleId) {
			queryBuilder.andWhere('p.customer_role_id = :customerRoleId', { customerRoleId });
			countQueryBuilder.andWhere('p.customer_role_id = :customerRoleId', { customerRoleId });
		}

		const [data, count] = await Promise.all([
			queryBuilder.getRawMany(),
			countQueryBuilder.getCount()
		]);
		const meta = getMeta(filter, count);

		return { data, meta };
	}
}
