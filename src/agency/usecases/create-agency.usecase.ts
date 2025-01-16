import { Injectable } from '@nestjs/common';
import { CreateAgencyDto, AgencyEntity, AgencyRepository } from '@lib/modules/agency';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateAgencyUseCase extends ExecuteHandler<AgencyEntity> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async execute(data: CreateAgencyDto): Promise<AgencyEntity> {
		return this.agencyRepository.create({ data });
	}
}
