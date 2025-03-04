import { TicketRepository } from './ticket.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketTypeormEntity } from '../entities/ticket.typeorm.entity';
import { getMeta, getPageLimitOffset } from '@lib/common/helpers';
import { FilterTicketDto } from '../dto/filter-ticket.dto';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { BadRequestException } from '@nestjs/common';

@Repository(TicketTypeormEntity)
export class TicketTypeormRepository
	extends BaseTypeormRepository<TicketTypeormEntity>
	implements TicketRepository
{
	async findPaginated(filter: FilterTicketDto) {
		const {
			ticketGroupId,
			eventId,
			ticketInfoId,
			customerId,
			orderId,
			search,
			searchFields,
			status,
			user
		} = filter;
		const { limit, page, offset } = getPageLimitOffset(filter);

		const queryBuilder = this.repository
			.createQueryBuilder('t')
			.select([
				't.id as id',
				't.created_at as "createdAt"',
				't.updated_at as "updatedAt"',
				't.status as status',
				't.code as code',
				't.use_at as "useAt"',
				't.expires_at as "expiresAt"',
				't.base_price as "basePrice"',
				't.discount_type as "discountType"',
				't.discount_value as "discountValue"',
				't.discounted_price as "discountedPrice"',
				'e.name as "eventName"',
				'tg.name as "ticketGroupName"',
				'tf.name as "ticketInfoName"',
				'c.name as "customerName"',
				'o.code as "orderCode"'
			])
			.leftJoin('events', 'e', 'e.id = t.event_id')
			.leftJoin('ticket_groups', 'tg', 'tg.id = t.ticket_group_id')
			.leftJoin('ticket_infos', 'tf', 'tf.id = t.ticket_info_id')
			.leftJoin('customers', 'c', 'c.id = t.customer_id')
			.leftJoin('orders', 'o', 'o.id = t.order_id')
			.orderBy('t.created_at', 'DESC');
		const countQueryBuilder = this.repository.createQueryBuilder('t');

		if (user?.role === ENUM_TOKEN_ROLE.AGENCY && user?.eventIds?.length) {
			if (eventId && !user.eventIds.includes(eventId)) {
				throw new BadRequestException('Invalid event id');
			}

			queryBuilder.where('t.event_id IN (:...eventIds)', { eventIds: user.eventIds });
			countQueryBuilder.where('t.event_id IN (:...eventIds)', { eventIds: user.eventIds });
		}

		if (eventId) {
			queryBuilder.where('t.event_id = :eventId', { eventId });
			countQueryBuilder.where('t.event_id = :eventId', { eventId });
		}

		if (ticketGroupId) {
			queryBuilder.where('t.ticket_group_id = :ticketGroupId', { ticketGroupId });
			countQueryBuilder.where('t.ticket_group_id = :ticketGroupId', { ticketGroupId });
		}

		if (ticketInfoId) {
			queryBuilder.where('t.ticket_info_id = :ticketInfoId', { ticketInfoId });
			countQueryBuilder.where('t.ticket_info_id = :ticketInfoId', { ticketInfoId });
		}

		if (customerId) {
			queryBuilder.where('t.customer_id = :customerId', { customerId });
			countQueryBuilder.where('t.customer_id = :customerId', { customerId });
		}

		if (orderId) {
			queryBuilder.where('t.order_id = :orderId', { orderId });
			countQueryBuilder.where('t.order_id = :orderId', { orderId });
		}

		if (status) {
			queryBuilder.andWhere('t.status = :status', { status });
			countQueryBuilder.andWhere('t.status = :status', { status });
		}

		if (search && searchFields) {
			this.addSearchFields(queryBuilder, 't', searchFields, search);
			this.addSearchFields(countQueryBuilder, 't', searchFields, search);
		}

		const [data, count] = await Promise.all([
			queryBuilder
				.limit(+(limit || '25'))
				.offset(offset)
				.getRawMany(),
			countQueryBuilder.getCount()
		]);
		const meta = getMeta(limit, page, count);

		return {
			data,
			meta
		};
	}
}
