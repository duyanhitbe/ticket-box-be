import { Injectable } from '@nestjs/common';
import {
	CreateTicketPriceDto,
	TicketPriceEntity,
	TicketPriceRepository
} from '@lib/modules/ticket-price';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateTicketPriceUseCase extends ExecuteHandler<TicketPriceEntity> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async execute(data: CreateTicketPriceDto): Promise<TicketPriceEntity> {
		return this.ticketPriceRepository.create({ data });
	}
}
