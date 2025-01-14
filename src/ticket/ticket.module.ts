import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { CreateTicketUseCase } from './usecases/create-ticket.usecase';
import { FindTicketUseCase } from './usecases/find-ticket.usecase';
import { DetailTicketUseCase } from './usecases/detail-ticket.usecase';
import { TicketConsumer } from './ticket.consumer';
import { TicketService } from './ticket.service';
import { GetImportTicketTemplateUseCase } from './usecases/get-import-ticket-template.usecase';

@Module({
	controllers: [TicketController, TicketConsumer],
	providers: [
		TicketService,
		CreateTicketUseCase,
		FindTicketUseCase,
		DetailTicketUseCase,
		GetImportTicketTemplateUseCase
	]
})
export class TicketModule {}
