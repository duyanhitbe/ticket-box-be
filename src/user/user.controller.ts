import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { FindUserUseCase } from './usecases/find-user.usecase';
import { DetailUserUseCase } from './usecases/detail-user.usecase';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserEntity } from './entities/user.entity.abstract';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse
} from '@lib/common/swagger';

@Controller('users')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly deleteUserUseCase: DeleteUserUseCase,
		private readonly findUserUseCase: FindUserUseCase,
		private readonly detailUserUseCase: DetailUserUseCase
	) {}

	@Post()
	@SwaggerCreatedResponse({ summary: 'Create user', type: UserEntity })
	create(@Body() data: CreateUserDto) {
		return this.createUserUseCase.execute(data);
	}

	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update user', type: UserEntity })
	update(@Param('id') id: string, @Body() data: UpdateUserDto) {
		return this.updateUserUseCase.execute(id, data);
	}

	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove user', type: UserEntity })
	remove(@Param('id') id: string) {
		return this.deleteUserUseCase.execute(id);
	}

	@Get()
	@SwaggerListResponse({ summary: 'List user', type: UserEntity })
	findAll(@Query() filter: FilterUserDto) {
		return this.findUserUseCase.query(filter);
	}

	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail user', type: UserEntity })
	findOne(@Param('id') id: string) {
		return this.detailUserUseCase.query(id);
	}
}
