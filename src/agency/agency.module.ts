import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { CreateAgencyUseCase } from './usecases/create-agency.usecase';
import { UpdateAgencyUseCase } from './usecases/update-agency.usecase';
import { DeleteAgencyUseCase } from './usecases/delete-agency.usecase';
import { FindAgencyUseCase } from './usecases/find-agency.usecase';
import { DetailAgencyUseCase } from './usecases/detail-agency.usecase';

@Module({
	controllers: [AgencyController],
	providers: [
		CreateAgencyUseCase,
		UpdateAgencyUseCase,
		DeleteAgencyUseCase,
		FindAgencyUseCase,
		DetailAgencyUseCase
	]
})
export class AgencyModule {}
