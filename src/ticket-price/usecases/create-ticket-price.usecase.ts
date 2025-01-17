import { Injectable } from '@nestjs/common';
import {
	CreateTicketPriceDto,
	TicketPriceEntity,
	TicketPriceRepository
} from '@lib/modules/ticket-price';
import { ExecuteHandler } from '@lib/common/abstracts';
import { TicketInfoRepository } from '@lib/modules/ticket-info';
import { TicketPriceService } from '../ticket-price.service';

@Injectable()
export class CreateTicketPriceUseCase extends ExecuteHandler<TicketPriceEntity> {
	constructor(
		private readonly ticketPriceRepository: TicketPriceRepository,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketPriceService: TicketPriceService
	) {
		super();
	}

	async execute(data: CreateTicketPriceDto): Promise<TicketPriceEntity> {
		const { ticketInfoId, agencyLevelId, basePrice, discountType, discountValue } = data;

		const { eventId, ticketGroupId } = await this.ticketInfoRepository.findByIdOrThrow({
			id: ticketInfoId,
			select: ['eventId', 'ticketGroupId']
		});

		const discountedPrice = this.ticketPriceService.calculateDiscountedPrice(
			basePrice,
			discountType,
			discountValue
		);

		return this.ticketPriceRepository.create({
			data: {
				eventId,
				ticketGroupId,
				ticketInfoId,
				agencyLevelId,
				basePrice,
				discountType,
				discountValue,
				discountedPrice
			}
		});
	}
}
