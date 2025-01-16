import { Injectable } from '@nestjs/common';
import { AgencyUserRepository, FilterAgencyUserDto } from '@lib/modules/agency-user';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';
import { CustomerEntity } from '@lib/modules/customer';

@Injectable()
export class FindAgencyUserUseCase extends QueryHandler<PaginationResponse<CustomerEntity>> {
	constructor(private readonly agencyUserRepository: AgencyUserRepository) {
		super();
	}

	async query(filter: FilterAgencyUserDto): Promise<PaginationResponse<CustomerEntity>> {
		return this.agencyUserRepository.findPaginated(filter);
	}
}
