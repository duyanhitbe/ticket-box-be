import { Injectable } from '@nestjs/common';
import { AgencyEntity, AgencyRepository } from '@lib/modules/agency';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteAgencyUseCase extends ExecuteHandler<AgencyEntity> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async execute(id: string): Promise<AgencyEntity> {
		return this.agencyRepository.softDeleteById({ id });
	}
}
