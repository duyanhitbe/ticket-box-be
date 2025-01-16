import { Injectable } from '@nestjs/common';
import { AgencyUserRepository, CreateAgencyUserDto } from '@lib/modules/agency-user';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerEntity } from '@lib/modules/customer';
import { AgencyRepository } from '@lib/modules/agency';

@Injectable()
export class CreateAgencyUserUseCase extends ExecuteHandler<CustomerEntity> {
	constructor(
		private readonly agencyUserRepository: AgencyUserRepository,
		private readonly agencyRepository: AgencyRepository
	) {
		super();
	}

	async execute(data: CreateAgencyUserDto): Promise<CustomerEntity> {
		const { agencyId } = data;

		const agency = await this.agencyRepository.findByIdOrThrow({
			id: agencyId,
			select: ['id', 'agencyLevelId']
		});

		return this.agencyUserRepository.create({
			data: {
				...data,
				isAgency: true,
				agencyId,
				agencyLevelId: agency.agencyLevelId
			}
		});
	}
}
