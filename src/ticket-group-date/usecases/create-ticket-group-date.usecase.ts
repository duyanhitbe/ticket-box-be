import { Injectable } from '@nestjs/common';
import { CreateTicketGroupDateDto, TicketGroupDateEntity, TicketGroupDateRepository } from '@lib/modules/ticket-group-date';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateTicketGroupDateUseCase extends ExecuteHandler<TicketGroupDateEntity> {
	constructor(private readonly ticketGroupDateRepository: TicketGroupDateRepository) {
		super();
	}

	async execute(data: CreateTicketGroupDateDto): Promise<TicketGroupDateEntity> {
		return this.ticketGroupDateRepository.create({ data });
	}
}
