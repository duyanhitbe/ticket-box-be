import { Injectable } from '@nestjs/common';
import { TicketGroupDateEntity, TicketGroupDateRepository } from '@lib/modules/ticket-group-date';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteTicketGroupDateUseCase extends ExecuteHandler<TicketGroupDateEntity> {
	constructor(private readonly ticketGroupDateRepository: TicketGroupDateRepository) {
		super();
	}

	async execute(id: string): Promise<TicketGroupDateEntity> {
		return this.ticketGroupDateRepository.softDeleteById({ id });
	}
}
