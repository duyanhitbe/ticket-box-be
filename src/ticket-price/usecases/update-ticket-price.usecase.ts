import { Injectable } from '@nestjs/common';
import {
	TicketPriceEntity,
	TicketPriceRepository,
	UpdateTicketPriceDto
} from '@lib/modules/ticket-price';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateTicketPriceUseCase extends ExecuteHandler<TicketPriceEntity> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async execute(id: string, data: UpdateTicketPriceDto): Promise<TicketPriceEntity> {
		return this.ticketPriceRepository.updateById({ id, data });
	}
}
