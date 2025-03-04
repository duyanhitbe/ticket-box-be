import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
	AgencyEntity,
	CreateAgencyDto,
	FilterAgencyDto,
	ListAgencyEntity,
	UpdateAgencyDto
} from '@lib/modules/agency';
import { CreateAgencyUseCase } from './usecases/create-agency.usecase';
import { UpdateAgencyUseCase } from './usecases/update-agency.usecase';
import { DeleteAgencyUseCase } from './usecases/delete-agency.usecase';
import { FindAgencyUseCase } from './usecases/find-agency.usecase';
import { DetailAgencyUseCase } from './usecases/detail-agency.usecase';
import {
	QueryWithUser,
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

@Controller('agencies')
export class AgencyController {
	constructor(
		private readonly createAgencyUseCase: CreateAgencyUseCase,
		private readonly updateAgencyUseCase: UpdateAgencyUseCase,
		private readonly deleteAgencyUseCase: DeleteAgencyUseCase,
		private readonly findAgencyUseCase: FindAgencyUseCase,
		private readonly detailAgencyUseCase: DetailAgencyUseCase
	) {}

	/**
	 * @path POST /api/v1/agencies
	 * @param data {CreateAgencyDto}
	 * @returns {Promise<AgencyEntity>}
	 */
	@UseAuth({ roles: [ENUM_TOKEN_ROLE.USER] })
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create agency', type: AgencyEntity })
	create(@Body() data: CreateAgencyDto): Promise<AgencyEntity> {
		return this.createAgencyUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/agencies/:id
	 * @param id {string}
	 * @param data {UpdateAgencyDto}
	 * @returns {Promise<AgencyEntity>}
	 */
	@UseAuth()
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update agency', type: AgencyEntity })
	update(@Param('id') id: string, @Body() data: UpdateAgencyDto): Promise<AgencyEntity> {
		return this.updateAgencyUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/agencies/:id
	 * @param id {string}
	 * @returns {Promise<AgencyEntity>}
	 */
	@UseAuth({ roles: [ENUM_TOKEN_ROLE.USER] })
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove agency', type: AgencyEntity })
	remove(@Param('id') id: string): Promise<AgencyEntity> {
		return this.deleteAgencyUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/agencies
	 * @param filter {FilterAgencyDto}
	 * @returns {Promise<PaginationResponse<ListAgencyEntity>>}
	 */
	@UseAuth()
	@Get()
	@SwaggerListResponse({ summary: 'List agency', type: ListAgencyEntity })
	findAll(
		@QueryWithUser() filter: FilterAgencyDto
	): Promise<PaginationResponse<ListAgencyEntity>> {
		return this.findAgencyUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/agencies/:id
	 * @param id {string}
	 * @returns {Promise<AgencyEntity>}
	 */
	@UseAuth()
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail agency', type: AgencyEntity })
	findOne(@Param('id') id: string): Promise<AgencyEntity> {
		return this.detailAgencyUseCase.query(id);
	}
}
