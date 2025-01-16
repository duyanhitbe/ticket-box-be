import { Injectable } from '@nestjs/common';
import { FilterAgencyLevelDto, AgencyLevelEntity, AgencyLevelRepository } from '@lib/modules/agency-level';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindAgencyLevelUseCase extends QueryHandler<PaginationResponse<AgencyLevelEntity>> {
	constructor(private readonly agencyLevelRepository: AgencyLevelRepository) {
		super();
	}

	async query(filter: FilterAgencyLevelDto): Promise<PaginationResponse<AgencyLevelEntity>> {
		return this.agencyLevelRepository.findPaginated(filter);
	}
}
