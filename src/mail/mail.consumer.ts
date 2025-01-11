import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';
import { NodemailerService } from '@lib/core/nodemailer';
import { SendMailOrderEventPayload } from '@lib/modules/mail';

@Controller()
@Logging()
export class MailConsumer {
	constructor(private readonly nodemailerService: NodemailerService) {}

	@EventPattern(RABBITMQ_PATTERNS.SEND_MAIL_ORDER)
	async onSendMailOrderSuccess(
		@Payload() payload: SendMailOrderEventPayload,
		@Ctx() context: RmqContext
	) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		await this.nodemailerService.sendMailOrder(payload);
		channel.ack(originalMessage);
	}
}
