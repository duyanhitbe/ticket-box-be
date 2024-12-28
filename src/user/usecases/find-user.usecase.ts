import { Injectable } from '@nestjs/common';
import { FilterUserDto, UserEntity, UserRepository } from '@lib/modules/user';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';
import { ILike } from 'typeorm';

@Injectable()
export class FindUserUseCase extends QueryHandler<PaginationResponse<UserEntity>> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async query(filter: FilterUserDto): Promise<PaginationResponse<UserEntity>> {
		const { search } = filter;

		if (search) {
			set(filter, 'where.username', ILike(`%${search}%`));
		}

		return this.userRepository.findPaginated(filter);
	}
}
