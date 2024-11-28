import { Injectable } from '@nestjs/common';
import { TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteTicketUseCase extends ExecuteHandler<TicketEntity> {
	constructor(private readonly ticketRepository: TicketRepository) {
		super();
	}

	async execute(id: string): Promise<TicketEntity> {
		return this.ticketRepository.softDeleteById({ id });
	}
}
