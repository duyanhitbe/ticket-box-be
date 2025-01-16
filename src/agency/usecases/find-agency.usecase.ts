import { Injectable } from '@nestjs/common';
import { AgencyEntity, AgencyRepository, FilterAgencyDto } from '@lib/modules/agency';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindAgencyUseCase extends QueryHandler<PaginationResponse<AgencyEntity>> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async query(filter: FilterAgencyDto): Promise<PaginationResponse<AgencyEntity>> {
		filter.searchFields = ['name', 'phone'];
		if (filter.agencyLevelId) {
			set(filter, 'where.agencyLevelId', filter.agencyLevelId);
		}
		return this.agencyRepository.findPaginated(filter);
	}
}
