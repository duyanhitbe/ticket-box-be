import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateEventDto,
	ENUM_EVENT_TYPE,
	EventEntity,
	FilterEventDto,
	UpdateEventDto
} from '@lib/modules/event';
import { CreateEventUseCase } from './usecases/create-event.usecase';
import { UpdateEventUseCase } from './usecases/update-event.usecase';
import { DeleteEventUseCase } from './usecases/delete-event.usecase';
import { FindEventUseCase } from './usecases/find-event.usecase';
import { DetailEventUseCase } from './usecases/detail-event.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { FindBannerUseCase } from './usecases/find-banner.usecase';
import { FindLocationUseCase } from './usecases/find-location.usecase';

@Controller('events')
@UseAuth({ isPublic: true })
export class EventController {
	constructor(
		private readonly createEventUseCase: CreateEventUseCase,
		private readonly updateEventUseCase: UpdateEventUseCase,
		private readonly deleteEventUseCase: DeleteEventUseCase,
		private readonly findBannerUseCase: FindBannerUseCase,
		private readonly findEventUseCase: FindEventUseCase,
		private readonly findLocationUseCase: FindLocationUseCase,
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
	 * @path GET /api/v1/events/event-type
	 * @returns {ENUM_EVENT_TYPE[]}
	 */
	@Get('event-type')
	@SwaggerListResponse({
		summary: 'List event type',
		type: ENUM_EVENT_TYPE,
		isEnum: true,
		enumName: 'ENUM_EVENT_TYPE',
		paginated: false
	})
	findAllEventType(): ENUM_EVENT_TYPE[] {
		return Object.values(ENUM_EVENT_TYPE);
	}

	/**
	 * @path GET /api/v1/events/banner
	 * @returns {EventEntity[]}
	 */
	@Get('banner')
	@SwaggerListResponse({
		summary: 'List banner',
		type: EventEntity,
		paginated: false
	})
	findAllBanner(): Promise<EventEntity[]> {
		return this.findBannerUseCase.query();
	}

	/**
	 * @path GET /api/v1/events/location
	 * @returns {string[]}
	 */
	@Get('location')
	@SwaggerListResponse({
		summary: 'List location',
		type: String,
		paginated: false
	})
	findAllLocation(): Promise<string[]> {
		return this.findLocationUseCase.query();
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
