import { Module } from '@nestjs/common';
import { AgencyLevelController } from './agency-level.controller';
import { CreateAgencyLevelUseCase } from './usecases/create-agency-level.usecase';
import { UpdateAgencyLevelUseCase } from './usecases/update-agency-level.usecase';
import { DeleteAgencyLevelUseCase } from './usecases/delete-agency-level.usecase';
import { FindAgencyLevelUseCase } from './usecases/find-agency-level.usecase';
import { DetailAgencyLevelUseCase } from './usecases/detail-agency-level.usecase';

@Module({
	controllers: [AgencyLevelController],
	providers: [
		CreateAgencyLevelUseCase,
		UpdateAgencyLevelUseCase,
		DeleteAgencyLevelUseCase,
		FindAgencyLevelUseCase,
		DetailAgencyLevelUseCase
	]
})
export class AgencyLevelModule {}
