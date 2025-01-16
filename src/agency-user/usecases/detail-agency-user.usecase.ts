import { Injectable } from '@nestjs/common';
import { AgencyUserRepository } from '@lib/modules/agency-user';
import { QueryHandler } from '@lib/common/abstracts';
import { CustomerEntity } from '@lib/modules/customer';

@Injectable()
export class DetailAgencyUserUseCase extends QueryHandler<CustomerEntity> {
	constructor(private readonly agencyUserRepository: AgencyUserRepository) {
		super();
	}

	async query(id: string): Promise<CustomerEntity> {
		return this.agencyUserRepository.findByIdOrThrow({ id });
	}
}
