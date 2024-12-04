import { Injectable } from '@nestjs/common';
import {
	TICKET_GROUP_EVENTS,
	TicketGroupEntity,
	TicketGroupRepository,
	TicketGroupUpdatedPayload,
	UpdateTicketGroupDto
} from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventEmitterService } from '@lib/core/event';

@Injectable()
export class UpdateTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly eventEmitterService: EventEmitterService
	) {
		super();
	}

	async execute(id: string, data: UpdateTicketGroupDto): Promise<TicketGroupEntity> {
		const { dates, ...updateData } = data;
		const ticketGroup = await this.ticketGroupRepository.updateById({
			id,
			data: updateData,
			select: ['id', 'eventId']
		});

		const payload: TicketGroupUpdatedPayload = {
			eventId: ticketGroup.eventId,
			ticketGroupId: ticketGroup.id,
			dates: dates || []
		};
		this.eventEmitterService.emit(TICKET_GROUP_EVENTS.UPDATED, payload);

		return ticketGroup;
	}
}
