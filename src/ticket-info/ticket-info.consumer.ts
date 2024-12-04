import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TICKET_EVENTS } from '@lib/modules/ticket';

@Controller()
export class TicketInfoConsumer {
	/**
	 * TODO: Maybe delete this feature
	 */
	@OnEvent(TICKET_EVENTS.ROLLBACK)
	onTicketRollback() {}
}
