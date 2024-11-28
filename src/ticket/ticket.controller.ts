import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateTicketDto,
	FilterTicketDto,
	UpdateTicketDto,
	TicketEntity
} from '@lib/modules/ticket';
import { CreateTicketUseCase } from './usecases/create-ticket.usecase';
import { UpdateTicketUseCase } from './usecases/update-ticket.usecase';
import { DeleteTicketUseCase } from './usecases/delete-ticket.usecase';
import { FindTicketUseCase } from './usecases/find-ticket.usecase';
import { DetailTicketUseCase } from './usecases/detail-ticket.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('tickets')
export class TicketController {
	constructor(
		private readonly createTicketUseCase: CreateTicketUseCase,
		private readonly updateTicketUseCase: UpdateTicketUseCase,
		private readonly deleteTicketUseCase: DeleteTicketUseCase,
		private readonly findTicketUseCase: FindTicketUseCase,
		private readonly detailTicketUseCase: DetailTicketUseCase
	) {}

	/**
	 * @path POST /api/v1/tickets
	 * @param data {CreateTicketDto}
	 * @returns {Promise<TicketEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create ticket', type: TicketEntity })
	create(@Body() data: CreateTicketDto): Promise<TicketEntity> {
		return this.createTicketUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/tickets/:id
	 * @param id {string}
	 * @param data {UpdateTicketDto}
	 * @returns {Promise<TicketEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update ticket', type: TicketEntity })
	update(@Param('id') id: string, @Body() data: UpdateTicketDto): Promise<TicketEntity> {
		return this.updateTicketUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/tickets/:id
	 * @param id {string}
	 * @returns {Promise<TicketEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove ticket', type: TicketEntity })
	remove(@Param('id') id: string): Promise<TicketEntity> {
		return this.deleteTicketUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/tickets
	 * @param filter {FilterTicketDto}
	 * @returns {Promise<PaginationResponse<TicketEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List ticket', type: TicketEntity })
	findAll(@Query() filter: FilterTicketDto): Promise<PaginationResponse<TicketEntity>> {
		return this.findTicketUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/tickets/:id
	 * @param id {string}
	 * @returns {Promise<TicketEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket', type: TicketEntity })
	findOne(@Param('id') id: string): Promise<TicketEntity> {
		return this.detailTicketUseCase.query(id);
	}
}
