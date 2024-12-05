import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateCustomerRoleDto,
	CustomerRoleEntity,
	FilterCustomerRoleDto,
	UpdateCustomerRoleDto
} from '@lib/modules/customer-role';
import { CreateCustomerRoleUseCase } from './usecases/create-customer-role.usecase';
import { UpdateCustomerRoleUseCase } from './usecases/update-customer-role.usecase';
import { DeleteCustomerRoleUseCase } from './usecases/delete-customer-role.usecase';
import { FindCustomerRoleUseCase } from './usecases/find-customer-role.usecase';
import { DetailCustomerRoleUseCase } from './usecases/detail-customer-role.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('customer-roles')
@UseAuth({ isPublic: true })
export class CustomerRoleController {
	constructor(
		private readonly createCustomerRoleUseCase: CreateCustomerRoleUseCase,
		private readonly updateCustomerRoleUseCase: UpdateCustomerRoleUseCase,
		private readonly deleteCustomerRoleUseCase: DeleteCustomerRoleUseCase,
		private readonly findCustomerRoleUseCase: FindCustomerRoleUseCase,
		private readonly detailCustomerRoleUseCase: DetailCustomerRoleUseCase
	) {}

	/**
	 * @path POST /api/v1/customer-roles
	 * @param data {CreateCustomerRoleDto}
	 * @returns {Promise<CustomerRoleEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create customer-role', type: CustomerRoleEntity })
	create(@Body() data: CreateCustomerRoleDto): Promise<CustomerRoleEntity> {
		return this.createCustomerRoleUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/customer-roles/:id
	 * @param id {string}
	 * @param data {UpdateCustomerRoleDto}
	 * @returns {Promise<CustomerRoleEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update customer-role', type: CustomerRoleEntity })
	update(
		@Param('id') id: string,
		@Body() data: UpdateCustomerRoleDto
	): Promise<CustomerRoleEntity> {
		return this.updateCustomerRoleUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/customer-roles/:id
	 * @param id {string}
	 * @returns {Promise<CustomerRoleEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove customer-role', type: CustomerRoleEntity })
	remove(@Param('id') id: string): Promise<CustomerRoleEntity> {
		return this.deleteCustomerRoleUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/customer-roles
	 * @param filter {FilterCustomerRoleDto}
	 * @returns {Promise<PaginationResponse<CustomerRoleEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List customer-role', type: CustomerRoleEntity })
	findAll(
		@Query() filter: FilterCustomerRoleDto
	): Promise<PaginationResponse<CustomerRoleEntity>> {
		return this.findCustomerRoleUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/customer-roles/:id
	 * @param id {string}
	 * @returns {Promise<CustomerRoleEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail customer-role', type: CustomerRoleEntity })
	findOne(@Param('id') id: string): Promise<CustomerRoleEntity> {
		return this.detailCustomerRoleUseCase.query(id);
	}
}
