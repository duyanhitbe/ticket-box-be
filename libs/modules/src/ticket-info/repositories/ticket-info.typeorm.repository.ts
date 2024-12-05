import { TicketInfoRepository } from './ticket-info.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketInfoTypeormEntity } from '../entities/ticket-info.typeorm.entity';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-group.entity';
import { TicketInfoEntity } from '@lib/modules/ticket-info';

@Repository(TicketInfoTypeormEntity)
export class TicketInfoTypeormRepository
	extends BaseTypeormRepository<TicketInfoTypeormEntity>
	implements TicketInfoRepository
{
	async findAllWithPriceByGroup(
		ticketGroupId: string,
		customerRoleId: string
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
				'tp.ticket_info_id = t.id AND tp.customer_role_id = :customerRoleId',
				{
					customerRoleId
				}
			)
			.where('t.ticket_group_id = :ticketGroupId', { ticketGroupId });

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
}
