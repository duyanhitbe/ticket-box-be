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
		if (quantity > 0) {
			try {
				await this.createTicketUseCase.execute({ ticketInfoId, quantity });
				this.logger.log(`${quantity} ticket was created successfully`);
			} catch (e) {
				this.logger.error(e);
				this.logger.error(`Rollback ${quantity} ticket`);
			}
		}
	}
}
