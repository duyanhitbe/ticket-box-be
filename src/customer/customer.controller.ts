import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	CreateCustomerDto,
	CustomerEntity,
	FilterCustomerDto,
	UpdateCustomerDto
} from '@lib/modules/customer';
import { CreateCustomerUseCase } from './usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './usecases/update-customer.usecase';
import { DeleteCustomerUseCase } from './usecases/delete-customer.usecase';
import { FindCustomerUseCase } from './usecases/find-customer.usecase';
import { DetailCustomerUseCase } from './usecases/detail-customer.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';

@Controller('customers')
@UseAuth({ isPublic: true })
export class CustomerController {
	constructor(
		private readonly createCustomerUseCase: CreateCustomerUseCase,
		private readonly updateCustomerUseCase: UpdateCustomerUseCase,
		private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
		private readonly findCustomerUseCase: FindCustomerUseCase,
		private readonly detailCustomerUseCase: DetailCustomerUseCase
	) {}

	/**
	 * @path POST /api/v1/customers
	 * @param data {CreateCustomerDto}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create customer', type: CustomerEntity })
	create(@Body() data: CreateCustomerDto): Promise<CustomerEntity> {
		return this.createCustomerUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/customers/:id
	 * @param id {string}
	 * @param data {UpdateCustomerDto}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update customer', type: CustomerEntity })
	update(@Param('id') id: string, @Body() data: UpdateCustomerDto): Promise<CustomerEntity> {
		return this.updateCustomerUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/customers/:id
	 * @param id {string}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove customer', type: CustomerEntity })
	remove(@Param('id') id: string): Promise<CustomerEntity> {
		return this.deleteCustomerUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/customers
	 * @param filter {FilterCustomerDto}
	 * @returns {Promise<PaginationResponse<CustomerEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List customer', type: CustomerEntity })
	findAll(@Query() filter: FilterCustomerDto): Promise<PaginationResponse<CustomerEntity>> {
		return this.findCustomerUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/customers/:id
	 * @param id {string}
	 * @returns {Promise<CustomerEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail customer', type: CustomerEntity })
	findOne(@Param('id') id: string): Promise<CustomerEntity> {
		return this.detailCustomerUseCase.query(id);
	}
}
