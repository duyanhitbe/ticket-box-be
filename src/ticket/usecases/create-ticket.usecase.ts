import { Injectable } from '@nestjs/common';
import { CreateTicketDto, TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateTicketUseCase extends ExecuteHandler<TicketEntity> {
	constructor(private readonly ticketRepository: TicketRepository) {
		super();
	}

	async execute(data: CreateTicketDto): Promise<TicketEntity> {
		return this.ticketRepository.create({ data });
	}
}
