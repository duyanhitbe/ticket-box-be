import { BaseRepository } from '@lib/base/repositories';
import { CustomerEntity } from '../../customer';

export abstract class AgencyUserRepository extends BaseRepository<CustomerEntity> {}
