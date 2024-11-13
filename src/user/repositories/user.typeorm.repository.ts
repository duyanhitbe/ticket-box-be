import { IUserRepository } from './user.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';

@Repository(UserTypeormEntity)
export class UserTypeormRepository
	extends BaseTypeormRepository<UserTypeormEntity>
	implements IUserRepository {}
