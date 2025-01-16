import { Injectable } from '@nestjs/common';
import { AgencyUserRepository, UpdateAgencyUserDto } from '@lib/modules/agency-user';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerEntity } from '@lib/modules/customer';

@Injectable()
export class UpdateAgencyUserUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(private readonly agencyUserRepository: AgencyUserRepository) {
		super();
	}

	async execute(id: string, data: UpdateAgencyUserDto): Promise<CustomerEntity> {
		return this.agencyUserRepository.updateById({ id, data });
	}
}
