import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UserEntity, UserRepository } from '@lib/modules/user';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateUserUseCase extends ExecuteHandler<UserEntity> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async execute(id: string, data: UpdateUserDto): Promise<UserEntity> {
		return this.userRepository.updateById({ id, data });
	}
}
