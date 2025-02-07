import { PaginationResponse } from '@lib/base/dto';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth,
	User
} from '@lib/common/decorators';
import { RequestUser } from '@lib/common/interfaces';
import {
	CreateTicketInfoDto,
	FilterTicketInfoByGroupDto,
	FilterTicketInfoDto,
	TicketInfoByGroupEntity,
	TicketInfoEntity,
	UpdateTicketInfoDto
} from '@lib/modules/ticket-info';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTicketInfoUseCase } from './usecases/create-ticket-info.usecase';
import { DeleteTicketInfoUseCase } from './usecases/delete-ticket-info.usecase';
import { DetailTicketInfoUseCase } from './usecases/detail-ticket-info.usecase';
import { FindTicketInfoByGroupUseCase } from './usecases/find-ticket-info-by-group.usecase';
import { FindTicketInfoUseCase } from './usecases/find-ticket-info.usecase';
import { UpdateTicketInfoUseCase } from './usecases/update-ticket-info.usecase';

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
	@UseAuth()
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
	@UseAuth()
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
	@UseAuth()
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
	@UseAuth()
	@Get()
	@SwaggerListResponse({ summary: 'List ticket-info', type: TicketInfoEntity })
	findAll(@Query() filter: FilterTicketInfoDto): Promise<PaginationResponse<TicketInfoEntity>> {
		return this.findTicketInfoUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/ticket-infos/group
	 * @param filter {FilterTicketInfoByGroupDto}
	 * @param user {RequestUser}
	 * @returns {Promise<TicketInfoByGroupEntity[]>}
	 */
	@UseAuth({ isPublic: true })
	@Get('group')
	@SwaggerListResponse({
		summary: 'List ticket-info by group',
		type: TicketInfoByGroupEntity,
		paginated: false
	})
	findAllByGroup(
		@Query() filter: FilterTicketInfoByGroupDto,
		@User() user: RequestUser
	): Promise<TicketInfoByGroupEntity[]> {
		return this.findTicketInfoByGroupUseCase.query(filter, user?.agencyLevelId);
	}

	/**
	 * @path GET /api/v1/ticket-infos/:id
	 * @param id {string}
	 * @returns {Promise<TicketInfoEntity>}
	 */
	@UseAuth()
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket-info', type: TicketInfoEntity })
	findOne(@Param('id') id: string): Promise<TicketInfoEntity> {
		return this.detailTicketInfoUseCase.query(id);
	}
}
