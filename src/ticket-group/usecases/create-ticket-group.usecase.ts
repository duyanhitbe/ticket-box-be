import { Injectable } from '@nestjs/common';
import {
	CreateTicketGroupDto,
	TICKET_GROUP_EVENTS,
	TicketGroupCreatedPayload,
	TicketGroupEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { EventEmitterService } from '@lib/core/event';

@Injectable()
export class CreateTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly eventEmitterService: EventEmitterService
		// private readonly redisService: RedisService
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
			this.eventEmitterService.emit(TICKET_GROUP_EVENTS.CREATED, payload);
		}
		// await this.redisService.delGroup({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
		// 	key: [ticketGroup.eventId]
		// });
		return ticketGroup;
	}
}
