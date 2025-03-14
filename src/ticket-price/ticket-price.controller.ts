import { PaginationResponse } from '@lib/base/dto';
import {
	QueryWithUser,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import {
	FilterTicketPriceDto,
	ListTicketPriceEntity,
	TicketPriceEntity,
	UpdateManyTicketPriceDto,
	UpdateTicketPriceDto
} from '@lib/modules/ticket-price';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { DetailTicketPriceUseCase } from './usecases/detail-ticket-price.usecase';
import { FindTicketPriceUseCase } from './usecases/find-ticket-price.usecase';
import { UpdateManyTicketPriceUseCase } from './usecases/update-many-ticket-price.usecase';
import { UpdateTicketPriceUseCase } from './usecases/update-ticket-price.usecase';

@Controller('ticket-prices')
@UseAuth()
export class TicketPriceController {
	constructor(
		private readonly updateTicketPriceUseCase: UpdateTicketPriceUseCase,
		private readonly updateManyTicketPriceUseCase: UpdateManyTicketPriceUseCase,
		private readonly findTicketPriceUseCase: FindTicketPriceUseCase,
		private readonly detailTicketPriceUseCase: DetailTicketPriceUseCase
	) {}

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
		@QueryWithUser() filter: FilterTicketPriceDto
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
