import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { CreateEventUseCase } from './usecases/create-event.usecase';
import { UpdateEventUseCase } from './usecases/update-event.usecase';
import { DeleteEventUseCase } from './usecases/delete-event.usecase';
import { FindEventUseCase } from './usecases/find-event.usecase';
import { DetailEventUseCase } from './usecases/detail-event.usecase';

@Module({
	controllers: [EventController],
	providers: [
		CreateEventUseCase,
		UpdateEventUseCase,
		DeleteEventUseCase,
		FindEventUseCase,
		DetailEventUseCase
	]
})
export class EventModule {}
