import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateAgencyUserDto,
	FilterAgencyUserDto,
	UpdateAgencyUserDto
} from '@lib/modules/agency-user';
import { CreateAgencyUserUseCase } from './usecases/create-agency-user.usecase';
import { UpdateAgencyUserUseCase } from './usecases/update-agency-user.usecase';
import { DeleteAgencyUserUseCase } from './usecases/delete-agency-user.usecase';
import { FindAgencyUserUseCase } from './usecases/find-agency-user.usecase';
import { DetailAgencyUserUseCase } from './usecases/detail-agency-user.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { CustomerEntity } from '@lib/modules/customer';

@Controller('agency-users')
@UseAuth()
export class AgencyUserController {
	constructor(
		private readonly createAgencyUserUseCase: CreateAgencyUserUseCase,
		private readonly updateAgencyUserUseCase: UpdateAgencyUserUseCase,
		private readonly deleteAgencyUserUseCase: DeleteAgencyUserUseCase,
		private readonly findAgencyUserUseCase: FindAgencyUserUseCase,
		private readonly detailAgencyUserUseCase: DetailAgencyUserUseCase
	) {}

	/**
	 * @path POST /api/v1/agency-users
	 * @param data {CreateAgencyUserDto}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create agency-user', type: CustomerEntity })
	create(@Body() data: CreateAgencyUserDto): Promise<CustomerEntity> {
		return this.createAgencyUserUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/agency-users/:id
	 * @param id {string}
	 * @param data {UpdateAgencyUserDto}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update agency-user', type: CustomerEntity })
	update(@Param('id') id: string, @Body() data: UpdateAgencyUserDto): Promise<CustomerEntity> {
		return this.updateAgencyUserUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/agency-users/:id
	 * @param id {string}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove agency-user', type: CustomerEntity })
	remove(@Param('id') id: string): Promise<CustomerEntity> {
		return this.deleteAgencyUserUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/agency-users
	 * @param filter {FilterAgencyUserDto}
	 * @returns {Promise<PaginationResponse<CustomerEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List agency-user', type: CustomerEntity })
	findAll(@Query() filter: FilterAgencyUserDto): Promise<PaginationResponse<CustomerEntity>> {
		return this.findAgencyUserUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/agency-users/:id
	 * @param id {string}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail agency-user', type: CustomerEntity })
	findOne(@Param('id') id: string): Promise<CustomerEntity> {
		return this.detailAgencyUserUseCase.query(id);
	}
}
