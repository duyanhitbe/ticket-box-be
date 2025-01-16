import { Injectable } from '@nestjs/common';
import {
	AgencyLevelEntity,
	AgencyLevelRepository,
	FilterAgencyLevelDto
} from '@lib/modules/agency-level';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { set } from 'lodash';

@Injectable()
export class FindAgencyLevelUseCase extends QueryHandler<PaginationResponse<AgencyLevelEntity>> {
	constructor(private readonly agencyLevelRepository: AgencyLevelRepository) {
		super();
	}

	async query(filter: FilterAgencyLevelDto): Promise<PaginationResponse<AgencyLevelEntity>> {
		filter.searchFields = ['name'];
		if (filter.level) {
			set(filter, 'where.level', filter.level);
		}
		return this.agencyLevelRepository.findPaginated(filter);
	}
}
