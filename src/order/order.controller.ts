import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateOrderDto,
	FilterOrderDto,
	OrderCreatedEntity,
	OrderEntity,
	UpdateOrderDto
} from '@lib/modules/order';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { DeleteOrderUseCase } from './usecases/delete-order.usecase';
import { FindOrderUseCase } from './usecases/find-order.usecase';
import { DetailOrderUseCase } from './usecases/detail-order.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ProcessPaymentOrderUseCase } from './usecases/process-payment-order.usecase';

@Controller('orders')
export class OrderController {
	constructor(
		private readonly createOrderUseCase: CreateOrderUseCase,
		private readonly updateOrderUseCase: UpdateOrderUseCase,
		private readonly deleteOrderUseCase: DeleteOrderUseCase,
		private readonly findOrderUseCase: FindOrderUseCase,
		private readonly detailOrderUseCase: DetailOrderUseCase,
		private readonly processPaymentOrderUseCase: ProcessPaymentOrderUseCase
	) {}

	/**
	 * @path POST /api/v1/orders
	 * @param data {CreateOrderDto}
	 * @returns {Promise<OrderCreatedEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({
		summary: 'Create order',
		type: OrderCreatedEntity
	})
	create(@Body() data: CreateOrderDto): Promise<OrderCreatedEntity> {
		return this.createOrderUseCase.execute(data);
	}

	@Post('process-payment')
	@ApiExcludeEndpoint()
	processPayment() {
		return this.processPaymentOrderUseCase.execute();
	}

	/**
	 * @path GET /api/v1/orders/:id
	 * @param id {string}
	 * @param data {UpdateOrderDto}
	 * @returns {Promise<OrderEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update order', type: OrderEntity })
	update(@Param('id') id: string, @Body() data: UpdateOrderDto): Promise<OrderEntity> {
		return this.updateOrderUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/orders/:id
	 * @param id {string}
	 * @returns {Promise<OrderEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove order', type: OrderEntity })
	@ApiExcludeEndpoint()
	remove(@Param('id') id: string): Promise<OrderEntity> {
		return this.deleteOrderUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/orders
	 * @param filter {FilterOrderDto}
	 * @returns {Promise<PaginationResponse<OrderEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List order', type: OrderEntity })
	findAll(@Query() filter: FilterOrderDto): Promise<PaginationResponse<OrderEntity>> {
		return this.findOrderUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/orders/:id
	 * @param id {string}
	 * @returns {Promise<OrderEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail order', type: OrderEntity })
	findOne(@Param('id') id: string): Promise<OrderEntity> {
		return this.detailOrderUseCase.query(id);
	}
}
