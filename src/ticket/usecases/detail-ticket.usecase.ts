import { Injectable } from '@nestjs/common';
import { TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailTicketUseCase extends QueryHandler<TicketEntity> {
	constructor(private readonly ticketRepository: TicketRepository) {
		super();
	}

	async query(id: string): Promise<TicketEntity> {
		return this.ticketRepository.findByIdOrThrow({ id });
	}
}
