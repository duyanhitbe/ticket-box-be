import { Module } from '@nestjs/common';
import { TicketInfoController } from './ticket-info.controller';
import { CreateTicketInfoUseCase } from './usecases/create-ticket-info.usecase';
import { UpdateTicketInfoUseCase } from './usecases/update-ticket-info.usecase';
import { DeleteTicketInfoUseCase } from './usecases/delete-ticket-info.usecase';
import { FindTicketInfoUseCase } from './usecases/find-ticket-info.usecase';
import { DetailTicketInfoUseCase } from './usecases/detail-ticket-info.usecase';
import { FindTicketInfoByGroupUseCase } from './usecases/find-ticket-info-by-group.usecase';

@Module({
	controllers: [TicketInfoController],
	providers: [
		CreateTicketInfoUseCase,
		UpdateTicketInfoUseCase,
		DeleteTicketInfoUseCase,
		FindTicketInfoUseCase,
		FindTicketInfoByGroupUseCase,
		DetailTicketInfoUseCase
	]
})
export class TicketInfoModule {}
