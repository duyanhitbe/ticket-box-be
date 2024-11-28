import { Injectable } from '@nestjs/common';
import { UpdateTicketDto, TicketEntity, TicketRepository } from '@lib/modules/ticket';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateTicketUseCase extends ExecuteHandler<TicketEntity> {
	constructor(private readonly ticketRepository: TicketRepository) {
		super();
	}

	async execute(id: string, data: UpdateTicketDto): Promise<TicketEntity> {
		return this.ticketRepository.updateById({ id, data });
	}
}
