import { AgencyRepository } from './agency.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { AgencyTypeormEntity } from '../entities/agency.typeorm.entity';

@Repository(AgencyTypeormEntity)
export class AgencyTypeormRepository
	extends BaseTypeormRepository<AgencyTypeormEntity>
	implements AgencyRepository {}
