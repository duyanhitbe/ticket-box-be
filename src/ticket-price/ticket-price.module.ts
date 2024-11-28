import { Module } from '@nestjs/common';
import { TicketPriceController } from './ticket-price.controller';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import { UpdateTicketPriceUseCase } from './usecases/update-ticket-price.usecase';
import { DeleteTicketPriceUseCase } from './usecases/delete-ticket-price.usecase';
import { FindTicketPriceUseCase } from './usecases/find-ticket-price.usecase';
import { DetailTicketPriceUseCase } from './usecases/detail-ticket-price.usecase';

@Module({
	controllers: [TicketPriceController],
	providers: [
		CreateTicketPriceUseCase,
		UpdateTicketPriceUseCase,
		DeleteTicketPriceUseCase,
		FindTicketPriceUseCase,
		DetailTicketPriceUseCase
	]
})
export class TicketPriceModule {}
