import { Injectable } from '@nestjs/common';
import { TicketGroupEntity, TicketGroupRepository } from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async execute(id: string): Promise<TicketGroupEntity> {
		return this.ticketGroupRepository.softDeleteById({ id });
	}
}
