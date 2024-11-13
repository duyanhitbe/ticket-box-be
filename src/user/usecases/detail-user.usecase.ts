import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { IUserRepository } from '../repositories/user.repository.abstract';

@Injectable()
export class DetailUserUseCase implements IQueryHandler<UserEntity> {
	constructor(private readonly userRepository: IUserRepository) {}

	async query(id: string): Promise<UserEntity> {
		const user = await this.userRepository.findById({ id });

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}
}
