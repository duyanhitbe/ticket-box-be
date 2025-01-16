import { Injectable } from '@nestjs/common';
import { AgencyLevelEntity, AgencyLevelRepository } from '@lib/modules/agency-level';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailAgencyLevelUseCase extends QueryHandler<AgencyLevelEntity> {
	constructor(private readonly agencyLevelRepository: AgencyLevelRepository) {
		super();
	}

	async query(id: string): Promise<AgencyLevelEntity> {
		return this.agencyLevelRepository.findByIdOrThrow({ id });
	}
}
