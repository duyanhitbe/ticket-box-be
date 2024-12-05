import { Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { TicketInfoByIdsEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-ids.entity';
import { TicketInfoTypeormEntity } from '@lib/modules/ticket-info';

@Injectable()
export class OrderService {
	private readonly logger = new Logger(this.constructor.name);

	async findAllWithPriceByIds(
		ids: string[],
		customerRoleId: string,
		queryRunner: QueryRunner
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
				'tp.ticket_info_id = t.id AND tp.customer_role_id = :customerRoleId',
				{
					customerRoleId
				}
			)
			.leftJoin('events', 'e', 'e.id = t.event_id')
			.where('t.id IN (:...ids)', { ids });

		return queryBuilder.getRawMany();
	}
}
