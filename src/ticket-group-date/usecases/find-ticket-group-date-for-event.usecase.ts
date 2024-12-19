import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
	TicketGroupDateByEventType,
	TicketGroupDateRepository
} from '@lib/modules/ticket-group-date';
import { QueryHandler } from '@lib/common/abstracts';
import { TicketGroupRepository } from '@lib/modules/ticket-group';
import { ENUM_DATE_TYPE } from '@lib/modules/common';

@Injectable()
export class FindTicketGroupDateForEventUseCase extends QueryHandler<TicketGroupDateByEventType> {
	constructor(
		private readonly ticketGroupDateRepository: TicketGroupDateRepository,
		private readonly ticketGroupRepository: TicketGroupRepository
	) {
		super();
	}

	async query(eventId: string): Promise<TicketGroupDateByEventType> {
		const dateTypes = await this.ticketGroupRepository.findDateTypeByEventId(eventId);

		if (dateTypes.length === 1) {
			const dateType = dateTypes[0];
			switch (dateType) {
				case ENUM_DATE_TYPE.DURATION:
					const result = await this.ticketGroupRepository.findMinMaxDuration(eventId);
					if (!result) {
						this.logger.error('Data date DURATION is null');
						throw new InternalServerErrorException('Invalid data');
					}
					return result;
				case ENUM_DATE_TYPE.FIXED:
					const dates = await this.ticketGroupDateRepository
						.find({
							where: {
								eventId
							},
							select: ['date']
						})
						.then((res) => res.map((item) => item.date));
					return { dates };
			}
		}

		if (dateTypes.length === 2) {
			const result = await this.ticketGroupRepository.findMinMaxMixed(eventId);
			if (!result) {
				this.logger.error('Data date MIXED is null');
				throw new InternalServerErrorException('Invalid data');
			}
			return result;
		}

		this.logger.warn('Event has no any ticket group!!!');
		return {};
	}
}
