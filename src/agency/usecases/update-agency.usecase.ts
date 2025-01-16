import { Injectable } from '@nestjs/common';
import { UpdateAgencyDto, AgencyEntity, AgencyRepository } from '@lib/modules/agency';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateAgencyUseCase extends ExecuteHandler<AgencyEntity> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async execute(id: string, data: UpdateAgencyDto): Promise<AgencyEntity> {
		return this.agencyRepository.updateById({ id, data });
	}
}
