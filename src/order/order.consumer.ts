import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Consumer, RABBITMQ_PATTERNS, RabbitMQConsumer } from '@lib/core/rabbitmq';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { CancelOrderEventPayload, CreateOrderEventPayload } from '@lib/modules/order';
import { ProcessPaymentOrderUseCase } from './usecases/process-payment-order.usecase';
import { CancelOrderUsecase } from './usecases/cancel-order.usecase';

@Consumer()
export class OrderConsumer extends RabbitMQConsumer {
	constructor(
		private readonly createOrderUseCase: CreateOrderUseCase,
		private readonly cancelOrderUseCase: CancelOrderUsecase,
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

	@EventPattern(RABBITMQ_PATTERNS.CANCEL_ORDER)
	async onCancelOrder(@Payload() data: CancelOrderEventPayload, @Ctx() context: RmqContext) {
		this.subscribe(RABBITMQ_PATTERNS.CANCEL_ORDER);
		await this.cancelOrderUseCase.execute(data);
		this.ack(RABBITMQ_PATTERNS.CANCEL_ORDER, context);
	}

	@EventPattern(RABBITMQ_PATTERNS.PROCESS_PAYMENT)
	async onProcessPayment(@Payload() data: any, @Ctx() context: RmqContext) {
		this.subscribe(RABBITMQ_PATTERNS.PROCESS_PAYMENT);
		await this.processPaymentOrderUseCase.execute(data);
		this.ack(RABBITMQ_PATTERNS.PROCESS_PAYMENT, context);
	}
}
