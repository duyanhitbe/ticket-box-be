import { BaseRepository } from '@lib/base/repositories';
import { AgencyEntity } from '../entities/agency.entity.abstract';

export abstract class AgencyRepository extends BaseRepository<AgencyEntity> {}
