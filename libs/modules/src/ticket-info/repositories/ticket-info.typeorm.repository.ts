import { TicketInfoRepository } from './ticket-info.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketInfoTypeormEntity } from '../entities/ticket-info.typeorm.entity';
import {
	FilterTicketInfoDto,
	TicketInfoByGroupEntity,
	TicketInfoByIdsEntity,
	TicketInfoEntity
} from '@lib/modules/ticket-info';
import { CreateOptions } from '@lib/base/types';
import { getMeta, getPageLimitOffset, randomString } from '@lib/common/helpers';
import { PaginationResponse } from '@lib/base/dto';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';
import { QueryRunner } from 'typeorm';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { BadRequestException } from '@nestjs/common';

@Repository(TicketInfoTypeormEntity)
export class TicketInfoTypeormRepository
	extends BaseTypeormRepository<TicketInfoTypeormEntity>
	implements TicketInfoRepository
{
	async findAllWithPriceByGroup(
		ticketGroupId: string,
		agencyLevelId?: string
	): Promise<TicketInfoByGroupEntity[]> {
		const queryBuilder = this.repository
			.createQueryBuilder('t')
			.select([
				't.id as "id"',
				't.name as "name"',
				't.quantity as "quantity"',
				'tp.base_price as "basePrice"',
				'tp.discounted_price as "discountedPrice"'
			])
			.leftJoin(
				'ticket_prices',
				'tp',
				`tp.ticket_info_id = t.id AND ${agencyLevelId ? `tp.agency_level_id = '${agencyLevelId}'` : `tp.agency_level_id IS NULL`}`
			)
			.where('t.ticket_group_id = :ticketGroupId', { ticketGroupId })
			.andWhere('t.status = :status', { status: ENUM_STATUS.ACTIVE });

		return queryBuilder.getRawMany();
	}

	async findByIdForCreateTicket(id: string): Promise<TicketInfoEntity | null> {
		const ticketInfo = await this.findById({
			id,
			relations: ['ticketGroup', 'ticketGroup.dates'],
			select: {
				id: true,
				eventId: true,
				ticketGroupId: true,
				ticketGroup: {
					dateType: true,
					toDate: true,
					dates: {
						date: true
					}
				}
			}
		});

		if (!ticketInfo) {
			this.logger.error('TicketInfo not found');
			return null;
		}

		if (!ticketInfo.ticketGroup) {
			this.logger.error('Can not find TicketGroup');
			return null;
		}

		if (!ticketInfo.ticketGroup.dates) {
			this.logger.error('Can not find TicketGroupDate');
			return null;
		}

		return ticketInfo;
	}

	async create(
		options: CreateOptions<TicketInfoTypeormEntity>
	): Promise<TicketInfoTypeormEntity> {
		const { data } = options;
		const code = await this.getCode();

		return super.create({
			data: {
				...data,
				code
			}
		});
	}

	private async getCode(): Promise<string> {
		const code = randomString(6);

		const exist = await this.exists({
			where: { code }
		});
		if (exist) {
			return this.getCode();
		}

		return code;
	}

	async findPaginated(
		filter: FilterTicketInfoDto
	): Promise<PaginationResponse<TicketInfoTypeormEntity>> {
		const { ticketGroupId, eventId, search, searchFields, status, user } = filter;
		const { limit, page, offset } = getPageLimitOffset(filter);

		const queryBuilder = this.repository
			.createQueryBuilder('tf')
			.select([
				'tf.id as "id"',
				'tf.created_at as "createdAt"',
				'tf.updated_at as "updatedAt"',
				'tf.status as "status"',
				'tf.name as "name"',
				'tf.quantity as "quantity"',
				'tf.code as "code"',
				'tf.order as "order"',
				'e.name as "eventName"',
				'tg.name as "ticketGroupName"'
			])
			.leftJoin('events', 'e', 'e.id = tf.event_id')
			.leftJoin('ticket_groups', 'tg', 'tg.id = tf.ticket_group_id')
			.orderBy('tf.order', 'ASC');
		const countQueryBuilder = this.repository.createQueryBuilder('tf');

		if (ticketGroupId) {
			queryBuilder.where('tf.ticket_group_id = :ticketGroupId', { ticketGroupId });
			countQueryBuilder.where('tf.ticket_group_id = :ticketGroupId', { ticketGroupId });
		}

		if (user?.role === ENUM_TOKEN_ROLE.AGENCY && user?.eventIds?.length) {
			if (eventId && !user.eventIds.includes(eventId)) {
				throw new BadRequestException('Invalid event id');
			}

			queryBuilder.where('tf.event_id IN (:...eventIds)', { eventIds: user.eventIds });
			countQueryBuilder.where('tf.event_id IN (:...eventIds)', { eventIds: user.eventIds });
		}

		if (eventId) {
			queryBuilder.where('tf.event_id = :eventId', { eventId });
			countQueryBuilder.where('tf.event_id = :eventId', { eventId });
		}

		if (status) {
			queryBuilder.andWhere('tf.status = :status', { status });
			countQueryBuilder.andWhere('tf.status = :status', { status });
		}

		if (search && searchFields) {
			this.addSearchFields(queryBuilder, 'tf', searchFields, search);
			this.addSearchFields(countQueryBuilder, 'tf', searchFields, search);
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

	async findAllWithPriceByIds(
		ids: string[],
		queryRunner: QueryRunner,
		agencyLevelId?: string
	): Promise<TicketInfoByIdsEntity[]> {
		const queryBuilder = queryRunner.manager
			.createQueryBuilder(TicketInfoTypeormEntity, 't')
			.select([
				't.id as "id"',
				't.name as "name"',
				't.quantity as "quantity"',
				't.event_id as "eventId"',
				't.ticket_group_id as "ticketGroupId"',
				'tp.base_price as "basePrice"',
				'tp.discount_type as "discountType"',
				'tp.discount_value as "discountValue"',
				'tp.discounted_price as "discountedPrice"',
				'e.name as "eventName"'
			])
			.leftJoin(
				'ticket_prices',
				'tp',
				`tp.ticket_info_id = t.id AND ${agencyLevelId ? `tp.agency_level_id = '${agencyLevelId}'` : `tp.agency_level_id IS NULL`}`
			)
			.leftJoin('events', 'e', 'e.id = t.event_id')
			.where('t.id IN (:...ids)', { ids });

		return queryBuilder.getRawMany();
	}
}
