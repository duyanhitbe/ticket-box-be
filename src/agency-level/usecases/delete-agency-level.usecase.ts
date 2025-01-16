import { Injectable } from '@nestjs/common';
import { AgencyLevelEntity, AgencyLevelRepository } from '@lib/modules/agency-level';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteAgencyLevelUseCase extends ExecuteHandler<AgencyLevelEntity> {
	constructor(private readonly agencyLevelRepository: AgencyLevelRepository) {
		super();
	}

	async execute(id: string): Promise<AgencyLevelEntity> {
		return this.agencyLevelRepository.softDeleteById({ id });
	}
}
