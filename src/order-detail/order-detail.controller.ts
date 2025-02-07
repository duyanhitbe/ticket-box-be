import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilterOrderDetailDto, OrderDetailEntity } from '@lib/modules/order-detail';
import { FindOrderDetailUseCase } from './usecases/find-order-detail.usecase';
import { DetailOrderDetailUseCase } from './usecases/detail-order-detail.usecase';
import { SwaggerListResponse, SwaggerOkResponse, UseAuth } from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('order-details')
@UseAuth()
export class OrderDetailController {
	constructor(
		private readonly findOrderDetailUseCase: FindOrderDetailUseCase,
		private readonly detailOrderDetailUseCase: DetailOrderDetailUseCase
	) {}

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
