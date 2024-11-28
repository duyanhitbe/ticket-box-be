import { Module } from '@nestjs/common';
import { EventDateController } from './event-date.controller';
import { CreateEventDateUseCase } from './usecases/create-event-date.usecase';
import { UpdateEventDateUseCase } from './usecases/update-event-date.usecase';
import { DeleteEventDateUseCase } from './usecases/delete-event-date.usecase';
import { FindEventDateUseCase } from './usecases/find-event-date.usecase';
import { DetailEventDateUseCase } from './usecases/detail-event-date.usecase';

@Module({
	controllers: [EventDateController],
	providers: [
		CreateEventDateUseCase,
		UpdateEventDateUseCase,
		DeleteEventDateUseCase,
		FindEventDateUseCase,
		DetailEventDateUseCase
	]
})
export class EventDateModule {}
