import { Injectable } from '@nestjs/common';
import { CreateTicketDto, TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { ExecuteHandler } from '@lib/common/abstracts';
import { TicketInfoEntity, TicketInfoRepository } from '@lib/modules/ticket-info';
import { randomString, sortDates } from '@lib/common/helpers';
import { Data } from '@lib/base/types';
import { ENUM_DATE_TYPE } from '@lib/modules/common';

@Injectable()
export class CreateTicketUseCase extends ExecuteHandler<(TicketEntity | null)[] | null> {
	constructor(
		private readonly ticketRepository: TicketRepository,
		private readonly ticketInfoRepository: TicketInfoRepository
	) {
		super();
	}

	async execute(data: CreateTicketDto): Promise<(TicketEntity | null)[] | null> {
		const { ticketInfoId } = data;

		const ticketInfo = await this.ticketInfoRepository.findById({
			id: ticketInfoId,
			relations: ['ticketGroup', 'ticketGroup.dates'],
			select: {
				id: true,
				eventId: true,
				ticketGroupId: true,
				quantity: true,
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

		return Promise.all(
			Array.from({ length: ticketInfo.quantity || 0 }).map(() =>
				this.createTicket(ticketInfo)
			)
		);
	}

	private async createTicket(ticketInfo: TicketInfoEntity) {
		const creationData: Data<TicketEntity> = {
			ticketInfoId: ticketInfo.id
		};
		creationData.eventId = ticketInfo.eventId;
		creationData.ticketGroupId = ticketInfo.ticketGroupId;

		if (ticketInfo.ticketGroup?.dateType === ENUM_DATE_TYPE.DURATION) {
			if (!ticketInfo.ticketGroup.toDate) {
				this.logger.error('"toDate" is null');
				return null;
			}
			creationData.expiresAt = ticketInfo.ticketGroup.toDate;
		} else {
			const dates = sortDates(
				ticketInfo.ticketGroup?.dates?.map((item) => item.date) || [],
				'desc'
			);
			creationData.expiresAt = dates[0];
		}

		creationData.code = await this.getCode();

		return this.ticketRepository.create({ data: creationData });
	}

	private async getCode(): Promise<string> {
		const code = randomString(6);
		const exists = await this.ticketRepository.exists({
			where: { code }
		});
		if (exists) return this.getCode();
		return code;
	}
}
