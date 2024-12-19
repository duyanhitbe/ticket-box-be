import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';

@Controller()
@Logging()
export class MailConsumer {
	@EventPattern(RABBITMQ_PATTERNS.SEND_MAIL)
	onSendMail(@Payload() payload: any, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		console.log(payload);
		channel.ack(originalMessage);
	}
}
