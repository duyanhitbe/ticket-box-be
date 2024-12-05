import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateOrderDetailDto,
	FilterOrderDetailDto,
	OrderDetailEntity,
	UpdateOrderDetailDto
} from '@lib/modules/order-detail';
import { CreateOrderDetailUseCase } from './usecases/create-order-detail.usecase';
import { UpdateOrderDetailUseCase } from './usecases/update-order-detail.usecase';
import { DeleteOrderDetailUseCase } from './usecases/delete-order-detail.usecase';
import { FindOrderDetailUseCase } from './usecases/find-order-detail.usecase';
import { DetailOrderDetailUseCase } from './usecases/detail-order-detail.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('order-details')
@UseAuth({ isPublic: true })
export class OrderDetailController {
	constructor(
		private readonly createOrderDetailUseCase: CreateOrderDetailUseCase,
		private readonly updateOrderDetailUseCase: UpdateOrderDetailUseCase,
		private readonly deleteOrderDetailUseCase: DeleteOrderDetailUseCase,
		private readonly findOrderDetailUseCase: FindOrderDetailUseCase,
		private readonly detailOrderDetailUseCase: DetailOrderDetailUseCase
	) {}

	/**
	 * @path POST /api/v1/order-details
	 * @param data {CreateOrderDetailDto}
	 * @returns {Promise<OrderDetailEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create order-detail', type: OrderDetailEntity })
	create(@Body() data: CreateOrderDetailDto): Promise<OrderDetailEntity> {
		return this.createOrderDetailUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/order-details/:id
	 * @param id {string}
	 * @param data {UpdateOrderDetailDto}
	 * @returns {Promise<OrderDetailEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update order-detail', type: OrderDetailEntity })
	update(
		@Param('id') id: string,
		@Body() data: UpdateOrderDetailDto
	): Promise<OrderDetailEntity> {
		return this.updateOrderDetailUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/order-details/:id
	 * @param id {string}
	 * @returns {Promise<OrderDetailEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove order-detail', type: OrderDetailEntity })
	remove(@Param('id') id: string): Promise<OrderDetailEntity> {
		return this.deleteOrderDetailUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/order-details
	 * @param filter {FilterOrderDetailDto}
	 * @returns {Promise<PaginationResponse<OrderDetailEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List order-detail', type: OrderDetailEntity })
	findAll(@Query() filter: FilterOrderDetailDto): Promise<PaginationResponse<OrderDetailEntity>> {
		return this.findOrderDetailUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/order-details/:id
	 * @param id {string}
	 * @returns {Promise<OrderDetailEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail order-detail', type: OrderDetailEntity })
	findOne(@Param('id') id: string): Promise<OrderDetailEntity> {
		return this.detailOrderDetailUseCase.query(id);
	}
}
