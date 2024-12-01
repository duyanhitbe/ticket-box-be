import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TICKET_INFO_EVENTS, TicketInfoCreatedPayload } from '@lib/modules/ticket-info';
import { CreateTicketUseCase } from './usecases/create-ticket.usecase';

@Controller()
export class TicketConsumer {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly createTicketUseCase: CreateTicketUseCase) {}

	@OnEvent(TICKET_INFO_EVENTS.CREATED)
	async onTicketInfoCreated(payload: TicketInfoCreatedPayload) {
		const { ticketInfoId, quantity } = payload;
		if (quantity && quantity > 0) {
			await this.createTicketUseCase.execute({ ticketInfoId });
			this.logger.log(`${quantity} ticket was created successfully`);
		}
	}
}
