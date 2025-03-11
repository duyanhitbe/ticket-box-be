import { ExecuteHandler } from '@lib/common/abstracts';
import { CancelOrderEventPayload } from '@lib/modules/order';
import { Injectable } from '@nestjs/common';
import { TicketRepository } from '@lib/modules/ticket';
import { TicketInfoRepository } from '@lib/modules/ticket-info';

// totalPrice

@Injectable()
export class CancelOrderUsecase extends ExecuteHandler {
	constructor(
		private readonly ticketRepository: TicketRepository,
		private readonly ticketInfoRepository: TicketInfoRepository
	) {
		super();
	}

	async execute(data: CancelOrderEventPayload) {
		const { orderId } = data;
		const tickets = await this.ticketRepository.restockByOrderId(orderId);
		for (const ticket of tickets) {
			await this.ticketInfoRepository.increment({
				where: { id: ticket.ticketInfoId },
				column: 'quantity',
				value: 1
			});
		}
		this.logger.log(`Restocked ${tickets.length} tickets`);
	}
}
