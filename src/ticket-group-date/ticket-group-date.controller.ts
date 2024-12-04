import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateTicketGroupDateDto,
	FilterTicketGroupDateDto,
	TicketGroupDateEntity,
	UpdateTicketGroupDateDto
} from '@lib/modules/ticket-group-date';
import { CreateTicketGroupDateUseCase } from './usecases/create-ticket-group-date.usecase';
import { UpdateTicketGroupDateUseCase } from './usecases/update-ticket-group-date.usecase';
import { DeleteTicketGroupDateUseCase } from './usecases/delete-ticket-group-date.usecase';
import { FindTicketGroupDateUseCase } from './usecases/find-ticket-group-date.usecase';
import { DetailTicketGroupDateUseCase } from './usecases/detail-ticket-group-date.usecase';
import { SwaggerCreatedResponse, SwaggerOkResponse } from '@lib/common/decorators';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { EventTicketGroupDateEntity } from '@lib/modules/ticket-group-date/entities/event-ticket-group-date.entity';

@Controller('ticket-group-dates')
export class TicketGroupDateController {
	constructor(
		private readonly createTicketGroupDateUseCase: CreateTicketGroupDateUseCase,
		private readonly updateTicketGroupDateUseCase: UpdateTicketGroupDateUseCase,
		private readonly deleteTicketGroupDateUseCase: DeleteTicketGroupDateUseCase,
		private readonly findTicketGroupDateUseCase: FindTicketGroupDateUseCase,
		private readonly detailTicketGroupDateUseCase: DetailTicketGroupDateUseCase
	) {}

	/**
	 * @path POST /api/v1/ticket-group-dates
	 * @param data {CreateTicketGroupDateDto}
	 * @returns {Promise<TicketGroupDateEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create ticket-group-date', type: TicketGroupDateEntity })
	@ApiExcludeEndpoint()
	create(@Body() data: CreateTicketGroupDateDto): Promise<TicketGroupDateEntity> {
		return this.createTicketGroupDateUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/ticket-group-dates/:id
	 * @param id {string}
	 * @param data {UpdateTicketGroupDateDto}
	 * @returns {Promise<TicketGroupDateEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update ticket-group-date', type: TicketGroupDateEntity })
	@ApiExcludeEndpoint()
	update(
		@Param('id') id: string,
		@Body() data: UpdateTicketGroupDateDto
	): Promise<TicketGroupDateEntity> {
		return this.updateTicketGroupDateUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/ticket-group-dates/:id
	 * @param id {string}
	 * @returns {Promise<TicketGroupDateEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove ticket-group-date', type: TicketGroupDateEntity })
	@ApiExcludeEndpoint()
	remove(@Param('id') id: string): Promise<TicketGroupDateEntity> {
		return this.deleteTicketGroupDateUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/ticket-group-dates
	 * @param filter {FilterTicketGroupDateDto}
	 * @returns {Promise<EventTicketGroupDateEntity>}
	 */
	@Get()
	@SwaggerOkResponse({ summary: 'List ticket-group-date', type: EventTicketGroupDateEntity })
	findAll(@Query() filter: FilterTicketGroupDateDto): Promise<EventTicketGroupDateEntity> {
		return this.findTicketGroupDateUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-group-dates/:id
	 * @param id {string}
	 * @returns {Promise<TicketGroupDateEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket-group-date', type: TicketGroupDateEntity })
	@ApiExcludeEndpoint()
	findOne(@Param('id') id: string): Promise<TicketGroupDateEntity> {
		return this.detailTicketGroupDateUseCase.query(id);
	}
}
