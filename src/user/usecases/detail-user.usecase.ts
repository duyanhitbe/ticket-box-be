import { Injectable } from '@nestjs/common';
import { IQueryHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { IUserRepository } from '../repositories/user.repository.abstract';

@Injectable()
export class DetailUserUseCase implements IQueryHandler<UserEntity> {
	constructor(private readonly userRepository: IUserRepository) {}

	async query(id: string): Promise<UserEntity> {
		return this.userRepository.findByIdOrThrow({ id });
	}
}
