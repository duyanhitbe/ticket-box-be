import { AgencyLevelRepository } from './agency-level.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { AgencyLevelTypeormEntity } from '../entities/agency-level.typeorm.entity';

@Repository(AgencyLevelTypeormEntity)
export class AgencyLevelTypeormRepository
	extends BaseTypeormRepository<AgencyLevelTypeormEntity>
	implements AgencyLevelRepository {}
