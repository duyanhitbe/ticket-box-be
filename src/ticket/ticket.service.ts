import { Injectable, Logger } from '@nestjs/common';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { QueryRunner } from 'typeorm';
import { TicketEntity, TicketTypeormEntity } from '@lib/modules/ticket';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { randomString, sortDates } from '@lib/common/helpers';

@Injectable()
export class TicketService {
	private readonly logger = new Logger(this.constructor.name);

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

		creationData.code = await this.getCode(queryRunner);

		const ticket = new TicketTypeormEntity();
		Object.assign(ticket, creationData);
		const ticketEntity = await queryRunner.manager.save(ticket);
		return ticketEntity as TicketEntity;
	}

	private async getCode(queryRunner: QueryRunner): Promise<string> {
		const code = randomString(6);
		const exists = await queryRunner.manager.exists(TicketTypeormEntity, {
			where: { code }
		});
		if (exists) return this.getCode(queryRunner);
		return code;
	}
}
