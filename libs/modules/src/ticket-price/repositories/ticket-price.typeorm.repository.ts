import { TicketPriceRepository } from './ticket-price.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketPriceTypeormEntity } from '../entities/ticket-price.typeorm.entity';
import { PaginationResponse } from '@lib/base/dto';
import { FilterTicketPriceDto } from '@lib/modules/ticket-price';
import { getMeta, getPageLimitOffset } from '@lib/common/helpers';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { BadRequestException } from '@nestjs/common';
import { IsNull } from 'typeorm';

@Repository(TicketPriceTypeormEntity)
export class TicketPriceTypeormRepository
	extends BaseTypeormRepository<TicketPriceTypeormEntity>
	implements TicketPriceRepository
{
	async findPaginated(
		filter: FilterTicketPriceDto
	): Promise<PaginationResponse<TicketPriceTypeormEntity>> {
		const { eventId, ticketGroupId, agencyLevelId, ticketInfoId, status, user } = filter;
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
				'tf.name AS "ticketInfoName"',
				'a.name AS "agencyLevelName"',
				'a.level AS "agencyLevel"'
			])
			.leftJoin('events', 'e', 'e.id = p.event_id')
			.leftJoin('ticket_groups', 'tg', 'tg.id = p.ticket_group_id')
			.leftJoin('ticket_infos', 'tf', 'tf.id = p.ticket_info_id')
			.leftJoin('agency_levels', 'a', 'a.id = p.agency_level_id')
			.limit(limit)
			.offset(offset);
		const countQueryBuilder = this.repository.createQueryBuilder('p');

		if (user?.role === ENUM_TOKEN_ROLE.AGENCY && user?.eventIds?.length) {
			if (eventId && !user.eventIds.includes(eventId)) {
				throw new BadRequestException('Invalid event id');
			}

			queryBuilder.where('p.event_id IN (:...eventIds)', { eventIds: user.eventIds });
			countQueryBuilder.where('p.event_id IN (:...eventIds)', { eventIds: user.eventIds });
		}

		if (eventId) {
			queryBuilder.andWhere('p.event_id = :eventId', { eventId });
			countQueryBuilder.andWhere('p.event_id = :eventId', { eventId });
		}
		if (ticketGroupId) {
			queryBuilder.andWhere('p.ticket_group_id = :ticketGroupId', { ticketGroupId });
			countQueryBuilder.andWhere('p.ticket_group_id = :ticketGroupId', { ticketGroupId });
		}
		if (ticketInfoId) {
			queryBuilder.andWhere('p.ticket_info_id = :ticketInfoId', { ticketInfoId });
			countQueryBuilder.andWhere('p.ticket_info_id = :ticketInfoId', { ticketInfoId });
		}
		if (agencyLevelId) {
			queryBuilder.andWhere('p.agency_level_id = :agencyLevelId', { agencyLevelId });
			countQueryBuilder.andWhere('p.agency_level_id = :agencyLevelId', { agencyLevelId });
		}
		if (status) {
			queryBuilder.andWhere('p.status = :status', { status });
			countQueryBuilder.andWhere('p.status = :status', { status });
		}

		const [data, count] = await Promise.all([
			queryBuilder.getRawMany(),
			countQueryBuilder.getCount()
		]);
		const meta = getMeta(filter, count);

		return { data, meta };
	}

	async findNormalCustomerByTicketInfo(
		ticketInfoId: string
	): Promise<Pick<
		TicketPriceTypeormEntity,
		'id' | 'basePrice' | 'discountedPrice' | 'discountType' | 'discountValue'
	> | null> {
		return this.findOne({
			where: {
				ticketInfoId,
				agencyLevelId: IsNull()
			},
			select: {
				id: true,
				basePrice: true,
				discountedPrice: true,
				discountType: true,
				discountValue: true
			}
		});
	}
}
