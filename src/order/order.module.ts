import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { DeleteOrderUseCase } from './usecases/delete-order.usecase';
import { FindOrderUseCase } from './usecases/find-order.usecase';
import { DetailOrderUseCase } from './usecases/detail-order.usecase';
import { OrderConsumer } from './order.consumer';
import { ProcessPaymentOrderUseCase } from './usecases/process-payment-order.usecase';

@Module({
	controllers: [OrderController, OrderConsumer],
	providers: [
		CreateOrderUseCase,
		UpdateOrderUseCase,
		DeleteOrderUseCase,
		FindOrderUseCase,
		DetailOrderUseCase,
		ProcessPaymentOrderUseCase
	]
})
export class OrderModule {}
