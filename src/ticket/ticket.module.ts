import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { CreateTicketUseCase } from './usecases/create-ticket.usecase';
import { UpdateTicketUseCase } from './usecases/update-ticket.usecase';
import { DeleteTicketUseCase } from './usecases/delete-ticket.usecase';
import { FindTicketUseCase } from './usecases/find-ticket.usecase';
import { DetailTicketUseCase } from './usecases/detail-ticket.usecase';
import { TicketConsumer } from './ticket.consumer';
import { TicketService } from './ticket.service';

@Module({
	controllers: [TicketController, TicketConsumer],
	providers: [
		TicketService,
		CreateTicketUseCase,
		UpdateTicketUseCase,
		DeleteTicketUseCase,
		FindTicketUseCase,
		DetailTicketUseCase
	]
})
export class TicketModule {}
