import { Injectable } from '@nestjs/common';
import { TicketPriceEntity, TicketPriceRepository } from '@lib/modules/ticket-price';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteTicketPriceUseCase extends ExecuteHandler<TicketPriceEntity> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async execute(id: string): Promise<TicketPriceEntity> {
		return this.ticketPriceRepository.softDeleteById({ id });
	}
}
