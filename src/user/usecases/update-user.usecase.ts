import { Injectable } from '@nestjs/common';
import { IExecuteHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../repositories/user.repository.abstract';

@Injectable()
export class UpdateUserUseCase implements IExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: string, data: UpdateUserDto): Promise<UserEntity> {
		return this.userRepository.updateById({ id, data });
	}
}
