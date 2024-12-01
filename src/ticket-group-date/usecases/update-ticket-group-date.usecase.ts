import { Injectable } from '@nestjs/common';
import { UpdateTicketGroupDateDto, TicketGroupDateEntity, TicketGroupDateRepository } from '@lib/modules/ticket-group-date';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateTicketGroupDateUseCase extends ExecuteHandler<TicketGroupDateEntity> {
	constructor(private readonly ticketGroupDateRepository: TicketGroupDateRepository) {
		super();
	}

	async execute(id: string, data: UpdateTicketGroupDateDto): Promise<TicketGroupDateEntity> {
		return this.ticketGroupDateRepository.updateById({ id, data });
	}
}
