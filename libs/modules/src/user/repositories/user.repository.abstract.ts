import { BaseRepository } from '@lib/base/repositories';
import { UserEntity } from '../entities/user.entity.abstract';

export abstract class UserRepository extends BaseRepository<UserEntity> {}
