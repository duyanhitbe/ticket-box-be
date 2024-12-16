import { UserRepository } from './user.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';
import { PaginationResponse } from '@lib/base/dto';
import { FilterUserDto, UserEntity } from '@lib/modules/user';
import { FindPaginatedOptions } from '@lib/base/types';
import { ILike } from 'typeorm';

@Repository(UserTypeormEntity)
export class UserTypeormRepository
	extends BaseTypeormRepository<UserTypeormEntity>
	implements UserRepository
{
	async findPaginated(filter: FilterUserDto): Promise<PaginationResponse<UserTypeormEntity>> {
		const options: FindPaginatedOptions<UserEntity> = { ...filter };

		if (filter.username) {
			options.where = {
				username: ILike(`%${filter.username}%`)
			};
		}

		return super.findPaginated(options);
	}
}
