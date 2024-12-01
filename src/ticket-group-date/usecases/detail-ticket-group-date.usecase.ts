import { Injectable } from '@nestjs/common';
import { TicketGroupDateEntity, TicketGroupDateRepository } from '@lib/modules/ticket-group-date';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailTicketGroupDateUseCase extends QueryHandler<TicketGroupDateEntity> {
	constructor(private readonly ticketGroupDateRepository: TicketGroupDateRepository) {
		super();
	}

	async query(id: string): Promise<TicketGroupDateEntity> {
		return this.ticketGroupDateRepository.findByIdOrThrow({ id });
	}
}
