import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTicketDto, FilterTicketDto, TicketEntity } from '@lib/modules/ticket';
import { CreateTicketUseCase } from './usecases/create-ticket.usecase';
import { FindTicketUseCase } from './usecases/find-ticket.usecase';
import { DetailTicketUseCase } from './usecases/detail-ticket.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('tickets')
@UseAuth({ isPublic: true })
export class TicketController {
	constructor(
		private readonly createTicketUseCase: CreateTicketUseCase,
		private readonly findTicketUseCase: FindTicketUseCase,
		private readonly detailTicketUseCase: DetailTicketUseCase
	) {}

	/**
	 * @path POST /api/v1/tickets
	 * @param data {CreateTicketDto}
	 * @returns {Promise<string[]>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create more ticket', type: String, isArray: true })
	create(@Body() data: CreateTicketDto): Promise<string[]> {
		return this.createTicketUseCase.execute(data);
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
