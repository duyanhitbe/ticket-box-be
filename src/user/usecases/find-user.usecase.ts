import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { FilterUserDto, UserEntity, UserRepository } from '@lib/modules/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase extends QueryHandler<PaginationResponse<UserEntity>> {
	constructor(private readonly userRepository: UserRepository) {
		super();
	}

	async query(filter: FilterUserDto): Promise<PaginationResponse<UserEntity>> {
		filter.searchFields = ['username'];
		return this.userRepository.findPaginated(filter);
	}
}
