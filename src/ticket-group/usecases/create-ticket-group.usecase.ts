import { Injectable } from '@nestjs/common';
import {
	CreateTicketGroupDto,
	TICKET_GROUP_EVENTS,
	TicketGroupCreatedPayload,
	TicketGroupEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ENUM_DATE_TYPE } from '@lib/modules/common';

@Injectable()
export class CreateTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly eventEmitter: EventEmitter2
	) {
		super();
	}

	async execute(data: CreateTicketGroupDto): Promise<TicketGroupEntity> {
		const { dates, ...creationData } = data;
		const ticketGroup = await this.ticketGroupRepository.create({ data: creationData });

		if (ticketGroup.dateType === ENUM_DATE_TYPE.FIXED && dates) {
			const payload: TicketGroupCreatedPayload = {
				ticketGroupId: ticketGroup.id,
				eventId: ticketGroup.eventId,
				dates
			};
			this.eventEmitter.emit(TICKET_GROUP_EVENTS.CREATED, payload);
		}

		return ticketGroup;
	}
}
