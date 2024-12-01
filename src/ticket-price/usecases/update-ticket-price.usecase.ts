import { Injectable } from '@nestjs/common';
import {
	TicketPriceEntity,
	TicketPriceRepository,
	UpdateTicketPriceDto
} from '@lib/modules/ticket-price';
import { ExecuteHandler } from '@lib/common/abstracts';
import { TicketPriceService } from '../ticket-price.service';

@Injectable()
export class UpdateTicketPriceUseCase extends ExecuteHandler<TicketPriceEntity> {
	constructor(
		private readonly ticketPriceRepository: TicketPriceRepository,
		private readonly ticketPriceService: TicketPriceService
	) {
		super();
	}

	async execute(id: string, data: UpdateTicketPriceDto): Promise<TicketPriceEntity> {
		const ticketPrice = await this.ticketPriceRepository.findByIdOrThrow({
			id,
			select: ['id', 'basePrice', 'discountType', 'discountValue']
		});
		Object.assign(ticketPrice, data);

		ticketPrice.discountedPrice = this.ticketPriceService.calculateDiscountedPrice(
			ticketPrice.basePrice,
			ticketPrice.discountType,
			ticketPrice.discountValue
		);

		this.ticketPriceRepository.updateById({
			id,
			data: {
				basePrice: ticketPrice.basePrice,
				discountType: ticketPrice.discountType,
				discountValue: ticketPrice.discountValue,
				discountedPrice: ticketPrice.discountedPrice
			}
		});

		return ticketPrice;
	}
}
