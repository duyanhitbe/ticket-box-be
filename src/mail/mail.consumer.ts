import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';

@Controller()
@Logging()
export class MailConsumer {
	@EventPattern(RABBITMQ_PATTERNS.SEND_MAIL)
	onSendMail(@Payload() payload: any) {
		console.log(payload);
	}
}
