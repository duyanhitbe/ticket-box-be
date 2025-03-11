import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { FindOrderUseCase } from './usecases/find-order.usecase';
import { DetailOrderUseCase } from './usecases/detail-order.usecase';
import { OrderConsumer } from './order.consumer';
import { ProcessPaymentOrderUseCase } from './usecases/process-payment-order.usecase';
import { PlaceOrderUseCase } from './usecases/place-order.usecase';
import { HandleWebhookPaymentUseCase } from './usecases/handle-webhook-payment.usecase';
import { OrderService } from './order.service';
import { CancelOrderUsecase } from './usecases/cancel-order.usecase';

@Module({
	controllers: [OrderController, OrderConsumer],
	providers: [
		OrderService,
		CreateOrderUseCase,
		UpdateOrderUseCase,
		FindOrderUseCase,
		DetailOrderUseCase,
		ProcessPaymentOrderUseCase,
		PlaceOrderUseCase,
		HandleWebhookPaymentUseCase,
		CancelOrderUsecase
	]
})
export class OrderModule {}
