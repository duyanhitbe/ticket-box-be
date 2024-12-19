import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { CreateEventUseCase } from './usecases/create-event.usecase';
import { UpdateEventUseCase } from './usecases/update-event.usecase';
import { DeleteEventUseCase } from './usecases/delete-event.usecase';
import { FindEventUseCase } from './usecases/find-event.usecase';
import { DetailEventUseCase } from './usecases/detail-event.usecase';
import { FindBannerUseCase } from './usecases/find-banner.usecase';
import { FindLocationUseCase } from './usecases/find-location.usecase';
import { EventService } from './event.service';
import { TicketGroupDateModule } from '../ticket-group-date/ticket-group-date.module';

@Module({
	imports: [TicketGroupDateModule],
	controllers: [EventController],
	providers: [
		EventService,
		CreateEventUseCase,
		UpdateEventUseCase,
		DeleteEventUseCase,
		FindBannerUseCase,
		FindEventUseCase,
		FindLocationUseCase,
		DetailEventUseCase
	]
})
export class EventModule {}
