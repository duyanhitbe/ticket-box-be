import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';

@Controller()
@ApiExcludeController()
export class MailConsumer {
	@EventPattern(RABBITMQ_PATTERNS.SEND_MAIL)
	listenSendMail(@Payload() payload: any) {
		console.log(payload);
	}
}
