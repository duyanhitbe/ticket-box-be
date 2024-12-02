import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateTicketInfoDto,
	FilterTicketInfoDto,
	TicketInfoEntity,
	UpdateTicketInfoDto
} from '@lib/modules/ticket-info';
import { CreateTicketInfoUseCase } from './usecases/create-ticket-info.usecase';
import { UpdateTicketInfoUseCase } from './usecases/update-ticket-info.usecase';
import { DeleteTicketInfoUseCase } from './usecases/delete-ticket-info.usecase';
import { FindTicketInfoUseCase } from './usecases/find-ticket-info.usecase';
import { DetailTicketInfoUseCase } from './usecases/detail-ticket-info.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { FilterTicketInfoByGroupDto } from '@lib/modules/ticket-info/dto/filter-ticket-info-by-group.dto';
import { FindTicketInfoByGroupUseCase } from './usecases/find-ticket-info-by-group.usecase';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-group.entity.abstract';

@Controller('ticket-infos')
export class TicketInfoController {
	constructor(
		private readonly createTicketInfoUseCase: CreateTicketInfoUseCase,
		private readonly updateTicketInfoUseCase: UpdateTicketInfoUseCase,
		private readonly deleteTicketInfoUseCase: DeleteTicketInfoUseCase,
		private readonly findTicketInfoUseCase: FindTicketInfoUseCase,
		private readonly findTicketInfoByGroupUseCase: FindTicketInfoByGroupUseCase,
		private readonly detailTicketInfoUseCase: DetailTicketInfoUseCase
	) {}

	/**
	 * @path POST /api/v1/ticket-infos
	 * @param data {CreateTicketInfoDto}
	 * @returns {Promise<TicketInfoEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create ticket-info', type: TicketInfoEntity })
	create(@Body() data: CreateTicketInfoDto): Promise<TicketInfoEntity> {
		return this.createTicketInfoUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/ticket-infos/:id
	 * @param id {string}
	 * @param data {UpdateTicketInfoDto}
	 * @returns {Promise<TicketInfoEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update ticket-info', type: TicketInfoEntity })
	update(@Param('id') id: string, @Body() data: UpdateTicketInfoDto): Promise<TicketInfoEntity> {
		return this.updateTicketInfoUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/ticket-infos/:id
	 * @param id {string}
	 * @returns {Promise<TicketInfoEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove ticket-info', type: TicketInfoEntity })
	remove(@Param('id') id: string): Promise<TicketInfoEntity> {
		return this.deleteTicketInfoUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/ticket-infos
	 * @param filter {FilterTicketInfoDto}
	 * @returns {Promise<PaginationResponse<TicketInfoEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List ticket-info', type: TicketInfoEntity })
	findAll(@Query() filter: FilterTicketInfoDto): Promise<PaginationResponse<TicketInfoEntity>> {
		return this.findTicketInfoUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-infos/group
	 * @param filter {FilterTicketInfoByGroupDto}
	 * @returns {Promise<TicketInfoByGroupEntity[]>}
	 */
	@Get('group')
	@SwaggerListResponse({
		summary: 'List ticket-info',
		type: TicketInfoByGroupEntity,
		paginated: false
	})
	findAllByGroup(
		@Query() filter: FilterTicketInfoByGroupDto
	): Promise<TicketInfoByGroupEntity[]> {
		return this.findTicketInfoByGroupUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-infos/:id
	 * @param id {string}
	 * @returns {Promise<TicketInfoEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket-info', type: TicketInfoEntity })
	findOne(@Param('id') id: string): Promise<TicketInfoEntity> {
		return this.detailTicketInfoUseCase.query(id);
	}
}
