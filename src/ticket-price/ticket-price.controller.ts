import { PaginationResponse } from '@lib/base/dto';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import {
	CreateTicketPriceDto,
	FilterTicketPriceDto,
	ListTicketPriceEntity,
	TicketPriceEntity,
	UpdateManyTicketPriceDto,
	UpdateTicketPriceDto
} from '@lib/modules/ticket-price';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import { DetailTicketPriceUseCase } from './usecases/detail-ticket-price.usecase';
import { FindTicketPriceUseCase } from './usecases/find-ticket-price.usecase';
import { UpdateManyTicketPriceUseCase } from './usecases/update-many-ticket-price.usecase';
import { UpdateTicketPriceUseCase } from './usecases/update-ticket-price.usecase';

@Controller('ticket-prices')
@UseAuth({ isPublic: true })
export class TicketPriceController {
	constructor(
		private readonly createTicketPriceUseCase: CreateTicketPriceUseCase,
		private readonly updateTicketPriceUseCase: UpdateTicketPriceUseCase,
		private readonly updateManyTicketPriceUseCase: UpdateManyTicketPriceUseCase,
		private readonly findTicketPriceUseCase: FindTicketPriceUseCase,
		private readonly detailTicketPriceUseCase: DetailTicketPriceUseCase
	) {}

	/**
	 * @path POST /api/v1/ticket-prices
	 * @param data {CreateTicketPriceDto}
	 * @returns {Promise<TicketPriceEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create ticket-price', type: TicketPriceEntity })
	@ApiExcludeEndpoint()
	create(@Body() data: CreateTicketPriceDto): Promise<TicketPriceEntity> {
		return this.createTicketPriceUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/ticket-prices/many/:id
	 * @param data {UpdateManyTicketPriceDto}
	 * @returns {Promise<string[]>}
	 */
	@Patch('many')
	@SwaggerOkResponse({
		summary: 'Update many ticket-price',
		type: String,
		paginated: false,
		isArray: true
	})
	updateMany(@Body() data: UpdateManyTicketPriceDto): Promise<string[]> {
		return this.updateManyTicketPriceUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/ticket-prices/:id
	 * @param id {string}
	 * @param data {UpdateTicketPriceDto}
	 * @returns {Promise<TicketPriceEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update ticket-price', type: TicketPriceEntity })
	update(
		@Param('id') id: string,
		@Body() data: UpdateTicketPriceDto
	): Promise<TicketPriceEntity> {
		return this.updateTicketPriceUseCase.execute(id, data);
	}

	/**
	 * @path GET /api/v1/ticket-prices
	 * @param filter {FilterTicketPriceDto}
	 * @returns {Promise<PaginationResponse<ListTicketPriceEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List ticket-price', type: ListTicketPriceEntity })
	findAll(
		@Query() filter: FilterTicketPriceDto
	): Promise<PaginationResponse<ListTicketPriceEntity>> {
		return this.findTicketPriceUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-prices/:id
	 * @param id {string}
	 * @returns {Promise<TicketPriceEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket-price', type: TicketPriceEntity })
	findOne(@Param('id') id: string): Promise<TicketPriceEntity> {
		return this.detailTicketPriceUseCase.query(id);
	}
}
