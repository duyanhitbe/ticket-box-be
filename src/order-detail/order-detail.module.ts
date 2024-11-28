import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { CreateOrderDetailUseCase } from './usecases/create-order-detail.usecase';
import { UpdateOrderDetailUseCase } from './usecases/update-order-detail.usecase';
import { DeleteOrderDetailUseCase } from './usecases/delete-order-detail.usecase';
import { FindOrderDetailUseCase } from './usecases/find-order-detail.usecase';
import { DetailOrderDetailUseCase } from './usecases/detail-order-detail.usecase';

@Module({
	controllers: [OrderDetailController],
	providers: [
		CreateOrderDetailUseCase,
		UpdateOrderDetailUseCase,
		DeleteOrderDetailUseCase,
		FindOrderDetailUseCase,
		DetailOrderDetailUseCase
	]
})
export class OrderDetailModule {}
