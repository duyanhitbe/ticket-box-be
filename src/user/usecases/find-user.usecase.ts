import { Injectable } from '@nestjs/common';
import { IQueryHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { FilterUserDto } from '../dto/filter-user.dto';
import { IUserRepository } from '../repositories/user.repository.abstract';
import { PaginationResponse } from '@lib/base/dto';

@Injectable()
export class FindUserUseCase implements IQueryHandler<PaginationResponse<UserEntity>> {
	constructor(private readonly userRepository: IUserRepository) {}

	async query(filter: FilterUserDto): Promise<PaginationResponse<UserEntity>> {
		return this.userRepository.findPaginated(filter);
	}
}
