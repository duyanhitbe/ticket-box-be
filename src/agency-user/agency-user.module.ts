import { Module } from '@nestjs/common';
import { AgencyUserController } from './agency-user.controller';
import { CreateAgencyUserUseCase } from './usecases/create-agency-user.usecase';
import { UpdateAgencyUserUseCase } from './usecases/update-agency-user.usecase';
import { DeleteAgencyUserUseCase } from './usecases/delete-agency-user.usecase';
import { FindAgencyUserUseCase } from './usecases/find-agency-user.usecase';
import { DetailAgencyUserUseCase } from './usecases/detail-agency-user.usecase';

@Module({
	controllers: [AgencyUserController],
	providers: [
		CreateAgencyUserUseCase,
		UpdateAgencyUserUseCase,
		DeleteAgencyUserUseCase,
		FindAgencyUserUseCase,
		DetailAgencyUserUseCase
	]
})
export class AgencyUserModule {}
