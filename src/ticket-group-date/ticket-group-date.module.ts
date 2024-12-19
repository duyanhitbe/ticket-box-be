import { Module } from '@nestjs/common';
import { TicketGroupDateController } from './ticket-group-date.controller';
import { FindTicketGroupDateUseCase } from './usecases/find-ticket-group-date.usecase';
import { TicketGroupDateConsumer } from './ticket-group-date.consumer';
import { CreateTicketGroupDateUseCase } from './usecases/create-ticket-group-date.usecase';
import { FindTicketGroupDateForEventUseCase } from './usecases/find-ticket-group-date-for-event.usecase';

@Module({
	controllers: [TicketGroupDateController, TicketGroupDateConsumer],
	providers: [
		CreateTicketGroupDateUseCase,
		FindTicketGroupDateUseCase,
		FindTicketGroupDateForEventUseCase
	],
	exports: [FindTicketGroupDateForEventUseCase]
})
export class TicketGroupDateModule {}
