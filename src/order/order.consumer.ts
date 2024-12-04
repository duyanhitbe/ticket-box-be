import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';

@Controller()
@Logging()
export class OrderConsumer {
	@EventPattern(RABBITMQ_PATTERNS.CREATE_ORDER)
	onCreateOrder(@Payload() data: any, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		console.log(data);
		channel.ack(originalMessage);
	}

	@EventPattern(RABBITMQ_PATTERNS.PROCESS_PAYMENT)
	onProcessPayment(@Payload() data: any, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		console.log(data);
		channel.ack(originalMessage);
	}
}
