import { BaseRepository } from '@lib/base/repositories';
import { CustomerRoleEntity } from '../entities/customer-role.entity.abstract';

export abstract class CustomerRoleRepository extends BaseRepository<CustomerRoleEntity> {}
