import { Module } from '@nestjs/common';
import { TicketGroupDateController } from './ticket-group-date.controller';
import { FindTicketGroupDateUseCase } from './usecases/find-ticket-group-date.usecase';
import { TicketGroupDateConsumer } from './ticket-group-date.consumer';
import { CreateTicketGroupDateUseCase } from './usecases/create-ticket-group-date.usecase';

@Module({
	controllers: [TicketGroupDateController, TicketGroupDateConsumer],
	providers: [CreateTicketGroupDateUseCase, FindTicketGroupDateUseCase]
})
export class TicketGroupDateModule {}
