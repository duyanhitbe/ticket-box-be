import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateEventDateDto,
	FilterEventDateDto,
	UpdateEventDateDto,
	EventDateEntity
} from '@lib/modules/event-date';
import { CreateEventDateUseCase } from './usecases/create-event-date.usecase';
import { UpdateEventDateUseCase } from './usecases/update-event-date.usecase';
import { DeleteEventDateUseCase } from './usecases/delete-event-date.usecase';
import { FindEventDateUseCase } from './usecases/find-event-date.usecase';
import { DetailEventDateUseCase } from './usecases/detail-event-date.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('event-dates')
export class EventDateController {
	constructor(
		private readonly createEventDateUseCase: CreateEventDateUseCase,
		private readonly updateEventDateUseCase: UpdateEventDateUseCase,
		private readonly deleteEventDateUseCase: DeleteEventDateUseCase,
		private readonly findEventDateUseCase: FindEventDateUseCase,
		private readonly detailEventDateUseCase: DetailEventDateUseCase
	) {}

	/**
	 * @path POST /api/v1/event-dates
	 * @param data {CreateEventDateDto}
	 * @returns {Promise<EventDateEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create event-date', type: EventDateEntity })
	create(@Body() data: CreateEventDateDto): Promise<EventDateEntity> {
		return this.createEventDateUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/event-dates/:id
	 * @param id {string}
	 * @param data {UpdateEventDateDto}
	 * @returns {Promise<EventDateEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update event-date', type: EventDateEntity })
	update(@Param('id') id: string, @Body() data: UpdateEventDateDto): Promise<EventDateEntity> {
		return this.updateEventDateUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/event-dates/:id
	 * @param id {string}
	 * @returns {Promise<EventDateEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove event-date', type: EventDateEntity })
	remove(@Param('id') id: string): Promise<EventDateEntity> {
		return this.deleteEventDateUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/event-dates
	 * @param filter {FilterEventDateDto}
	 * @returns {Promise<PaginationResponse<EventDateEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List event-date', type: EventDateEntity })
	findAll(@Query() filter: FilterEventDateDto): Promise<PaginationResponse<EventDateEntity>> {
		return this.findEventDateUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/event-dates/:id
	 * @param id {string}
	 * @returns {Promise<EventDateEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail event-date', type: EventDateEntity })
	findOne(@Param('id') id: string): Promise<EventDateEntity> {
		return this.detailEventDateUseCase.query(id);
	}
}
