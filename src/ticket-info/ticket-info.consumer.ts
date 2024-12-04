import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TICKET_EVENTS } from '@lib/modules/ticket';
import { Logging } from '@lib/common/decorators';

@Controller()
@Logging()
export class TicketInfoConsumer {
	/**
	 * TODO: Maybe delete this feature
	 */
	@OnEvent(TICKET_EVENTS.ROLLBACK)
	onTicketRollback() {}
}
