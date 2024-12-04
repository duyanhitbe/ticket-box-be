import { TicketRepository } from './ticket.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketTypeormEntity } from '../entities/ticket.typeorm.entity';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { TicketEntity } from '@lib/modules/ticket';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { randomString, sortDates } from '@lib/common/helpers';
import { QueryRunner } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Repository(TicketTypeormEntity)
export class TicketTypeormRepository
	extends BaseTypeormRepository<TicketTypeormEntity>
	implements TicketRepository
{
	async createByTicketInfo(
		ticketInfo: TicketInfoEntity,
		queryRunner: QueryRunner
	): Promise<TicketEntity> {
		if (!ticketInfo.ticketGroup) {
			throw new Error('Ticket group is null');
		}

		const creationData: DeepPartial<TicketEntity> = {
			ticketInfoId: ticketInfo.id,
			eventId: ticketInfo.eventId,
			ticketGroupId: ticketInfo.ticketGroupId
		};

		if (ticketInfo.ticketGroup.dateType === ENUM_DATE_TYPE.DURATION) {
			if (!ticketInfo.ticketGroup.toDate) {
				this.logger.error('"toDate" is null');
				throw new Error('"toDate" is null');
			}
			creationData.expiresAt = ticketInfo.ticketGroup.toDate;
		} else {
			if (!ticketInfo.ticketGroup.dates) {
				throw new Error('"dates" is null');
			}
			const dates = sortDates(
				ticketInfo.ticketGroup?.dates?.map((item) => item.date) || [],
				'desc'
			);
			creationData.expiresAt = dates[0];
		}

		creationData.code = await this.getCode();

		const ticket = new TicketTypeormEntity();
		Object.assign(ticket, creationData);
		const ticketEntity = await queryRunner.manager.save(ticket);
		return ticketEntity as TicketEntity;
	}

	private async getCode(): Promise<string> {
		const code = randomString(6);
		const exists = await this.exists({
			where: { code }
		});
		if (exists) return this.getCode();
		return code;
	}
}
