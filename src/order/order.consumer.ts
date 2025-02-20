import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Consumer, RABBITMQ_PATTERNS, RabbitMQConsumer } from '@lib/core/rabbitmq';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { CreateOrderEventPayload } from '@lib/modules/order';
import { ProcessPaymentOrderUseCase } from './usecases/process-payment-order.usecase';

@Consumer()
export class OrderConsumer extends RabbitMQConsumer {
	constructor(
		private readonly createOrderUseCase: CreateOrderUseCase,
		private readonly processPaymentOrderUseCase: ProcessPaymentOrderUseCase
	) {
		super();
	}

	@EventPattern(RABBITMQ_PATTERNS.CREATE_ORDER)
	async onCreateOrder(@Payload() data: CreateOrderEventPayload, @Ctx() context: RmqContext) {
		this.subscribe(RABBITMQ_PATTERNS.CREATE_ORDER);
		await this.createOrderUseCase.execute(data);
		this.ack(RABBITMQ_PATTERNS.CREATE_ORDER, context);
	}

	@EventPattern(RABBITMQ_PATTERNS.PROCESS_PAYMENT)
	async onProcessPayment(@Payload() data: any, @Ctx() context: RmqContext) {
		this.subscribe(RABBITMQ_PATTERNS.PROCESS_PAYMENT);
		await this.processPaymentOrderUseCase.execute(data);
		this.ack(RABBITMQ_PATTERNS.PROCESS_PAYMENT, context);
	}
}
