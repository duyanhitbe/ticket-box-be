import { Injectable } from '@nestjs/common';
import { TicketGroupEntity, TicketGroupRepository } from '@lib/modules/ticket-group';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailTicketGroupUseCase extends QueryHandler<TicketGroupEntity> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(id: string): Promise<TicketGroupEntity> {
		return this.ticketGroupRepository.findByIdOrThrow({ id });
	}
}
