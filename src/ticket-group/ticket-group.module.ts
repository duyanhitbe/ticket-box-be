import { Module } from '@nestjs/common';
import { TicketGroupController } from './ticket-group.controller';
import { CreateTicketGroupUseCase } from './usecases/create-ticket-group.usecase';
import { UpdateTicketGroupUseCase } from './usecases/update-ticket-group.usecase';
import { DeleteTicketGroupUseCase } from './usecases/delete-ticket-group.usecase';
import { FindTicketGroupUseCase } from './usecases/find-ticket-group.usecase';
import { DetailTicketGroupUseCase } from './usecases/detail-ticket-group.usecase';

@Module({
	controllers: [TicketGroupController],
	providers: [
		CreateTicketGroupUseCase,
		UpdateTicketGroupUseCase,
		DeleteTicketGroupUseCase,
		FindTicketGroupUseCase,
		DetailTicketGroupUseCase
	]
})
export class TicketGroupModule {}
