import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateTicketGroupDto,
	FilterTicketGroupByEventDto,
	FilterTicketGroupDto,
	TicketGroupByEventEntity,
	TicketGroupDetailEntity,
	TicketGroupEntity,
	UpdateTicketGroupDto
} from '@lib/modules/ticket-group';
import { CreateTicketGroupUseCase } from './usecases/create-ticket-group.usecase';
import { UpdateTicketGroupUseCase } from './usecases/update-ticket-group.usecase';
import { DeleteTicketGroupUseCase } from './usecases/delete-ticket-group.usecase';
import { FindTicketGroupUseCase } from './usecases/find-ticket-group.usecase';
import { DetailTicketGroupUseCase } from './usecases/detail-ticket-group.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { FindTicketGroupByEventUseCase } from './usecases/find-ticket-group-by-event.usecase';

@Controller('ticket-groups')
@UseAuth({ isPublic: true })
export class TicketGroupController {
	constructor(
		private readonly createTicketGroupUseCase: CreateTicketGroupUseCase,
		private readonly updateTicketGroupUseCase: UpdateTicketGroupUseCase,
		private readonly deleteTicketGroupUseCase: DeleteTicketGroupUseCase,
		private readonly findTicketGroupUseCase: FindTicketGroupUseCase,
		private readonly findTicketGroupByEventUseCase: FindTicketGroupByEventUseCase,
		private readonly detailTicketGroupUseCase: DetailTicketGroupUseCase
	) {}

	/**
	 * @path POST /api/v1/ticket-groups
	 * @param data {CreateTicketGroupDto}
	 * @returns {Promise<TicketGroupEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create ticket-group', type: TicketGroupEntity })
	create(@Body() data: CreateTicketGroupDto): Promise<TicketGroupEntity> {
		return this.createTicketGroupUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/ticket-groups/:id
	 * @param id {string}
	 * @param data {UpdateTicketGroupDto}
	 * @returns {Promise<TicketGroupEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update ticket-group', type: TicketGroupEntity })
	update(
		@Param('id') id: string,
		@Body() data: UpdateTicketGroupDto
	): Promise<TicketGroupEntity> {
		return this.updateTicketGroupUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/ticket-groups/:id
	 * @param id {string}
	 * @returns {Promise<TicketGroupEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove ticket-group', type: TicketGroupEntity })
	remove(@Param('id') id: string): Promise<TicketGroupEntity> {
		return this.deleteTicketGroupUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/ticket-groups
	 * @param filter {FilterTicketGroupDto}
	 * @returns {Promise<PaginationResponse<TicketGroupEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List ticket-group', type: TicketGroupEntity })
	findAll(@Query() filter: FilterTicketGroupDto): Promise<PaginationResponse<TicketGroupEntity>> {
		return this.findTicketGroupUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-groups/event
	 * @param filter {FilterTicketGroupByEventDto}
	 * @returns {Promise<TicketGroupByEventEntity[]>}
	 */
	@Get('event')
	@SwaggerListResponse({
		summary: 'List ticket-group by event',
		type: TicketGroupByEventEntity,
		paginated: false
	})
	findAllByEvent(
		@Query() filter: FilterTicketGroupByEventDto
	): Promise<TicketGroupByEventEntity[]> {
		return this.findTicketGroupByEventUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-groups/:id
	 * @param id {string}
	 * @returns {Promise<TicketGroupDetailEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket-group', type: TicketGroupDetailEntity })
	findOne(@Param('id') id: string): Promise<TicketGroupDetailEntity> {
		return this.detailTicketGroupUseCase.query(id);
	}
}
