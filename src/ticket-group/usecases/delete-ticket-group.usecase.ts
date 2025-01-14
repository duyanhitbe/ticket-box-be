import { Injectable } from '@nestjs/common';
import { TicketGroupEntity, TicketGroupRepository } from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(
		private readonly ticketGroupRepository: TicketGroupRepository
		// private readonly redisService: RedisService
	) {
		super();
	}

	async execute(id: string): Promise<TicketGroupEntity> {
		const result = await this.ticketGroupRepository.softDeleteById({ id });
		// await this.redisService.delGroup({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
		// 	key: [result.eventId]
		// });
		return result;
	}
}
