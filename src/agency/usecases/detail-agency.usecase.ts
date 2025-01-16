import { Injectable } from '@nestjs/common';
import { AgencyEntity, AgencyRepository } from '@lib/modules/agency';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailAgencyUseCase extends QueryHandler<AgencyEntity> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async query(id: string): Promise<AgencyEntity> {
		return this.agencyRepository.findByIdOrThrow({ id });
	}
}
