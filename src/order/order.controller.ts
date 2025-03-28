import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
	CreateOrderDto,
	FilterOrderDto,
	ListOrderEntity,
	OrderCreatedEntity,
	OrderEntity,
	OrderUpdatedEntity,
	UpdateOrderDto
} from '@lib/modules/order';
import { UpdateOrderUseCase } from './usecases/update-order.usecase';
import { FindOrderUseCase } from './usecases/find-order.usecase';
import { DetailOrderUseCase } from './usecases/detail-order.usecase';
import {
	QueryWithUser,
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth,
	User
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AGENCY_AND_CUSTOMER_ROLE } from '@lib/core/jwt';
import { RequestUser } from '@lib/common/interfaces';
import { PlaceOrderUseCase } from './usecases/place-order.usecase';
import { HandleWebhookPaymentUseCase } from './usecases/handle-webhook-payment.usecase';

@Controller('orders')
export class OrderController {
	constructor(
		private readonly updateOrderUseCase: UpdateOrderUseCase,
		private readonly findOrderUseCase: FindOrderUseCase,
		private readonly detailOrderUseCase: DetailOrderUseCase,
		private readonly placeOrderUseCase: PlaceOrderUseCase,
		private readonly handleWebhookPaymentUseCase: HandleWebhookPaymentUseCase
	) {}

	/**
	 * @path POST /api/v1/orders
	 * @param data {CreateOrderDto}
	 * @param user
	 * @returns {Promise<OrderCreatedEntity>}
	 */
	@UseAuth({ roles: AGENCY_AND_CUSTOMER_ROLE, isPublic: true })
	@Post()
	@SwaggerCreatedResponse({
		summary: 'Create order',
		type: OrderCreatedEntity
	})
	create(@Body() data: CreateOrderDto, @User() user: RequestUser): Promise<OrderCreatedEntity> {
		return this.placeOrderUseCase.execute(data, user);
	}

	@Post('webhook-payment')
	@ApiExcludeEndpoint()
	processPayment() {
		return this.handleWebhookPaymentUseCase.execute();
	}

	/**
	 * @path GET /api/v1/orders/:id
	 * @param id {string}
	 * @param data {UpdateOrderDto}
	 * @returns {Promise<OrderEntity>}
	 */
	@UseAuth()
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update order', type: OrderUpdatedEntity })
	update(@Param('id') id: string, @Body() data: UpdateOrderDto): Promise<OrderUpdatedEntity> {
		return this.updateOrderUseCase.execute(id, data);
	}

	/**
	 * @path GET /api/v1/orders
	 * @param filter {FilterOrderDto}
	 * @returns {Promise<PaginationResponse<OrderEntity>>}
	 */
	@UseAuth()
	@Get()
	@SwaggerListResponse({ summary: 'List order', type: ListOrderEntity })
	findAll(@QueryWithUser() filter: FilterOrderDto): Promise<PaginationResponse<ListOrderEntity>> {
		return this.findOrderUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/orders/:id
	 * @param id {string}
	 * @returns {Promise<OrderEntity>}
	 */
	@UseAuth()
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail order', type: OrderEntity })
	findOne(@Param('id') id: string): Promise<OrderEntity> {
		return this.detailOrderUseCase.query(id);
	}
}
