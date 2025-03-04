import { Injectable } from '@nestjs/common';
import { AgencyRepository, FilterAgencyDto, ListAgencyEntity } from '@lib/modules/agency';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindAgencyUseCase extends QueryHandler<PaginationResponse<ListAgencyEntity>> {
	constructor(private readonly agencyRepository: AgencyRepository) {
		super();
	}

	async query(filter: FilterAgencyDto): Promise<PaginationResponse<ListAgencyEntity>> {
		filter.searchFields = ['name', 'phone'];
		return (await this.agencyRepository.findPaginated(filter)) as any;
	}
}
