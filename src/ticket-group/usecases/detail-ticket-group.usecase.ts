import { Injectable } from '@nestjs/common';
import { TicketGroupDetailEntity, TicketGroupRepository } from '@lib/modules/ticket-group';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailTicketGroupUseCase extends QueryHandler<TicketGroupDetailEntity> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(id: string): Promise<TicketGroupDetailEntity> {
		return this.ticketGroupRepository.detail(id);
	}
}
