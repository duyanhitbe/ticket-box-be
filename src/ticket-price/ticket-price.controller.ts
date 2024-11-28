import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateTicketPriceDto,
	FilterTicketPriceDto,
	UpdateTicketPriceDto,
	TicketPriceEntity
} from '@lib/modules/ticket-price';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import { UpdateTicketPriceUseCase } from './usecases/update-ticket-price.usecase';
import { DeleteTicketPriceUseCase } from './usecases/delete-ticket-price.usecase';
import { FindTicketPriceUseCase } from './usecases/find-ticket-price.usecase';
import { DetailTicketPriceUseCase } from './usecases/detail-ticket-price.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('ticket-prices')
export class TicketPriceController {
	constructor(
		private readonly createTicketPriceUseCase: CreateTicketPriceUseCase,
		private readonly updateTicketPriceUseCase: UpdateTicketPriceUseCase,
		private readonly deleteTicketPriceUseCase: DeleteTicketPriceUseCase,
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
	create(@Body() data: CreateTicketPriceDto): Promise<TicketPriceEntity> {
		return this.createTicketPriceUseCase.execute(data);
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
	 * @path DELETE /api/v1/ticket-prices/:id
	 * @param id {string}
	 * @returns {Promise<TicketPriceEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove ticket-price', type: TicketPriceEntity })
	remove(@Param('id') id: string): Promise<TicketPriceEntity> {
		return this.deleteTicketPriceUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/ticket-prices
	 * @param filter {FilterTicketPriceDto}
	 * @returns {Promise<PaginationResponse<TicketPriceEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List ticket-price', type: TicketPriceEntity })
	findAll(@Query() filter: FilterTicketPriceDto): Promise<PaginationResponse<TicketPriceEntity>> {
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
