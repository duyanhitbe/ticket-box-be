import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	AgencyLevelEntity,
	CreateAgencyLevelDto,
	FilterAgencyLevelDto,
	UpdateAgencyLevelDto
} from '@lib/modules/agency-level';
import { CreateAgencyLevelUseCase } from './usecases/create-agency-level.usecase';
import { UpdateAgencyLevelUseCase } from './usecases/update-agency-level.usecase';
import { DeleteAgencyLevelUseCase } from './usecases/delete-agency-level.usecase';
import { FindAgencyLevelUseCase } from './usecases/find-agency-level.usecase';
import { DetailAgencyLevelUseCase } from './usecases/detail-agency-level.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth,
	User
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';
import { RequestUser } from '@lib/common/interfaces';

@Controller('agency-levels')
@UseAuth({ roles: [ENUM_TOKEN_ROLE.USER, ENUM_TOKEN_ROLE.AGENCY] })
export class AgencyLevelController {
	constructor(
		private readonly createAgencyLevelUseCase: CreateAgencyLevelUseCase,
		private readonly updateAgencyLevelUseCase: UpdateAgencyLevelUseCase,
		private readonly deleteAgencyLevelUseCase: DeleteAgencyLevelUseCase,
		private readonly findAgencyLevelUseCase: FindAgencyLevelUseCase,
		private readonly detailAgencyLevelUseCase: DetailAgencyLevelUseCase
	) {}

	/**
	 * @path POST /api/v1/agency-levels
	 * @param data {CreateAgencyLevelDto}
	 * @returns {Promise<AgencyLevelEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create agency-level', type: AgencyLevelEntity })
	create(@Body() data: CreateAgencyLevelDto): Promise<AgencyLevelEntity> {
		return this.createAgencyLevelUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/agency-levels/:id
	 * @param id {string}
	 * @param data {UpdateAgencyLevelDto}
	 * @returns {Promise<AgencyLevelEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update agency-level', type: AgencyLevelEntity })
	update(
		@Param('id') id: string,
		@Body() data: UpdateAgencyLevelDto
	): Promise<AgencyLevelEntity> {
		return this.updateAgencyLevelUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/agency-levels/:id
	 * @param id {string}
	 * @returns {Promise<AgencyLevelEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove agency-level', type: AgencyLevelEntity })
	remove(@Param('id') id: string): Promise<AgencyLevelEntity> {
		return this.deleteAgencyLevelUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/agency-levels
	 * @param filter {FilterAgencyLevelDto}
	 * @param user
	 * @returns {Promise<PaginationResponse<AgencyLevelEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List agency-level', type: AgencyLevelEntity })
	findAll(
		@Query() filter: FilterAgencyLevelDto,
		@User() user: RequestUser
	): Promise<PaginationResponse<AgencyLevelEntity>> {
		filter.id = user?.agencyLevelId;
		return this.findAgencyLevelUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/agency-levels/:id
	 * @param id {string}
	 * @returns {Promise<AgencyLevelEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail agency-level', type: AgencyLevelEntity })
	findOne(@Param('id') id: string): Promise<AgencyLevelEntity> {
		return this.detailAgencyLevelUseCase.query(id);
	}
}
