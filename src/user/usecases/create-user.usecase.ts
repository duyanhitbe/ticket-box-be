import { Injectable } from '@nestjs/common';
import { IExecuteHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../repositories/user.repository.abstract';

@Injectable()
export class CreateUserUseCase implements IExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(data: CreateUserDto): Promise<UserEntity> {
		return this.userRepository.create({ data });
	}
}
