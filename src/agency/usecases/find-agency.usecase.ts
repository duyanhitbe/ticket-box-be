import { Injectable } from '@nestjs/common';
import { FilterAgencyDto, AgencyEntity, AgencyRepository } from '@lib/modules/agency';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindAgencyUseCase extends QueryHandler<PaginationResponse<AgencyEntity>> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async query(filter: FilterAgencyDto): Promise<PaginationResponse<AgencyEntity>> {
		return this.agencyRepository.findPaginated(filter);
	}
}
