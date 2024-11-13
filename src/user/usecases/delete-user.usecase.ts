import { Injectable } from '@nestjs/common';
import { IExecuteHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { IUserRepository } from '../repositories/user.repository.abstract';

@Injectable()
export class DeleteUserUseCase implements IExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: string): Promise<UserEntity> {
		return this.userRepository.softDeleteById({ id });
	}
}
