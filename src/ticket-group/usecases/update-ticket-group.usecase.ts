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
		// private readonly redisService: RedisService
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

		// await this.redisService.delGroup({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
		// 	key: [ticketGroup.eventId]
		// });

		return ticketGroup;
	}
}
