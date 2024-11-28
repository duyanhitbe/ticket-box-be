import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateEventDto, FilterEventDto, UpdateEventDto, EventEntity } from '@lib/modules/event';
import { CreateEventUseCase } from './usecases/create-event.usecase';
import { UpdateEventUseCase } from './usecases/update-event.usecase';
import { DeleteEventUseCase } from './usecases/delete-event.usecase';
import { FindEventUseCase } from './usecases/find-event.usecase';
import { DetailEventUseCase } from './usecases/detail-event.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('events')
export class EventController {
	constructor(
		private readonly createEventUseCase: CreateEventUseCase,
		private readonly updateEventUseCase: UpdateEventUseCase,
		private readonly deleteEventUseCase: DeleteEventUseCase,
		private readonly findEventUseCase: FindEventUseCase,
		private readonly detailEventUseCase: DetailEventUseCase
	) {}

	/**
	 * @path POST /api/v1/events
	 * @param data {CreateEventDto}
	 * @returns {Promise<EventEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create event', type: EventEntity })
	create(@Body() data: CreateEventDto): Promise<EventEntity> {
		return this.createEventUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/events/:id
	 * @param id {string}
	 * @param data {UpdateEventDto}
	 * @returns {Promise<EventEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update event', type: EventEntity })
	update(@Param('id') id: string, @Body() data: UpdateEventDto): Promise<EventEntity> {
		return this.updateEventUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/events/:id
	 * @param id {string}
	 * @returns {Promise<EventEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove event', type: EventEntity })
	remove(@Param('id') id: string): Promise<EventEntity> {
		return this.deleteEventUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/events
	 * @param filter {FilterEventDto}
	 * @returns {Promise<PaginationResponse<EventEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List event', type: EventEntity })
	findAll(@Query() filter: FilterEventDto): Promise<PaginationResponse<EventEntity>> {
		return this.findEventUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/events/:id
	 * @param id {string}
	 * @returns {Promise<EventEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail event', type: EventEntity })
	findOne(@Param('id') id: string): Promise<EventEntity> {
		return this.detailEventUseCase.query(id);
	}
}
