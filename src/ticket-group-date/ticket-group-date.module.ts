import { Module } from '@nestjs/common';
import { TicketGroupDateController } from './ticket-group-date.controller';
import { CreateTicketGroupDateUseCase } from './usecases/create-ticket-group-date.usecase';
import { UpdateTicketGroupDateUseCase } from './usecases/update-ticket-group-date.usecase';
import { DeleteTicketGroupDateUseCase } from './usecases/delete-ticket-group-date.usecase';
import { FindTicketGroupDateUseCase } from './usecases/find-ticket-group-date.usecase';
import { DetailTicketGroupDateUseCase } from './usecases/detail-ticket-group-date.usecase';
import { TicketGroupDateConsumer } from './ticket-group-date.consumer';

@Module({
	controllers: [TicketGroupDateController, TicketGroupDateConsumer],
	providers: [
		CreateTicketGroupDateUseCase,
		UpdateTicketGroupDateUseCase,
		DeleteTicketGroupDateUseCase,
		FindTicketGroupDateUseCase,
		DetailTicketGroupDateUseCase
	]
})
export class TicketGroupDateModule {}
