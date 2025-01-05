import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';
import { NodemailerService } from '@lib/core/nodemailer';
import { SendMailOrderSuccessEventPayload } from '@lib/modules/mail';

@Controller()
@Logging()
export class MailConsumer {
	constructor(private readonly nodemailerService: NodemailerService) {}

	@EventPattern(RABBITMQ_PATTERNS.SEND_MAIL_ORDER_SUCCESS)
	onSendMail(@Payload() payload: SendMailOrderSuccessEventPayload, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		console.log(payload);
		this.nodemailerService.sendOrderSuccess({
			to: payload.customerEmail,
			customerName: payload.customerName,
			totalPrice: payload.totalPrice,
			orderCode: payload.orderCode,
			details: payload.details
		});
		channel.ack(originalMessage);
	}
}
