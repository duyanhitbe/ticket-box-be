import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { CreateOrderEventPayload } from '@lib/modules/order';
import { ProcessPaymentOrderUseCase } from './usecases/process-payment-order.usecase';

@Controller()
@Logging()
export class OrderConsumer {
	constructor(
		private readonly createOrderUseCase: CreateOrderUseCase,
		private readonly processPaymentOrderUseCase: ProcessPaymentOrderUseCase
	) {}

	@EventPattern(RABBITMQ_PATTERNS.CREATE_ORDER)
	async onCreateOrder(@Payload() data: CreateOrderEventPayload, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		await this.createOrderUseCase.execute(data);
		channel.ack(originalMessage);
	}

	@EventPattern(RABBITMQ_PATTERNS.PROCESS_PAYMENT)
	async onProcessPayment(@Payload() data: any, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		await this.processPaymentOrderUseCase.execute(data);
		channel.ack(originalMessage);
	}
}
