import { Injectable } from '@nestjs/common';
import { UpdateAgencyLevelDto, AgencyLevelEntity, AgencyLevelRepository } from '@lib/modules/agency-level';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateAgencyLevelUseCase extends ExecuteHandler<AgencyLevelEntity> {
	constructor(private readonly agencyLevelRepository: AgencyLevelRepository) {
		super();
	}

	async execute(id: string, data: UpdateAgencyLevelDto): Promise<AgencyLevelEntity> {
		return this.agencyLevelRepository.updateById({ id, data });
	}
}
