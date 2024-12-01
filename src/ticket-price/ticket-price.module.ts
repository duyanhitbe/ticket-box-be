import { Module } from '@nestjs/common';
import { TicketPriceController } from './ticket-price.controller';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import { UpdateTicketPriceUseCase } from './usecases/update-ticket-price.usecase';
import { DeleteTicketPriceUseCase } from './usecases/delete-ticket-price.usecase';
import { FindTicketPriceUseCase } from './usecases/find-ticket-price.usecase';
import { DetailTicketPriceUseCase } from './usecases/detail-ticket-price.usecase';
import { TicketPriceService } from './ticket-price.service';
import { TicketPriceConsumer } from './ticket-price.consumer';

@Module({
	controllers: [TicketPriceController, TicketPriceConsumer],
	providers: [
		TicketPriceService,
		CreateTicketPriceUseCase,
		UpdateTicketPriceUseCase,
		DeleteTicketPriceUseCase,
		FindTicketPriceUseCase,
		DetailTicketPriceUseCase
	]
})
export class TicketPriceModule {}
