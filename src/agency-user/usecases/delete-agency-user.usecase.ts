import { Injectable } from '@nestjs/common';
import { AgencyUserRepository } from '@lib/modules/agency-user';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerEntity } from '@lib/modules/customer';

@Injectable()
export class DeleteAgencyUserUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(private readonly agencyUserRepository: AgencyUserRepository) {
		super();
	}

	async execute(id: string): Promise<CustomerEntity> {
		return this.agencyUserRepository.softDeleteById({ id });
	}
}
