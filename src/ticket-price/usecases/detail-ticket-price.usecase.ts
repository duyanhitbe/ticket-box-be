import { Injectable } from '@nestjs/common';
import { TicketPriceEntity, TicketPriceRepository } from '@lib/modules/ticket-price';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailTicketPriceUseCase extends QueryHandler<TicketPriceEntity> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async query(id: string): Promise<TicketPriceEntity> {
		return this.ticketPriceRepository.findByIdOrThrow({ id });
	}
}
