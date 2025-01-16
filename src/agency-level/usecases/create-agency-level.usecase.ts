import { Injectable } from '@nestjs/common';
import { CreateAgencyLevelDto, AgencyLevelEntity, AgencyLevelRepository } from '@lib/modules/agency-level';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateAgencyLevelUseCase extends ExecuteHandler<AgencyLevelEntity> {
	constructor(private readonly agencyLevelRepository: AgencyLevelRepository) {
		super();
	}

	async execute(data: CreateAgencyLevelDto): Promise<AgencyLevelEntity> {
		return this.agencyLevelRepository.create({ data });
	}
}
