import { Injectable } from '@nestjs/common';
import { TicketInfoEntity, TicketInfoRepository } from '@lib/modules/ticket-info';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailTicketInfoUseCase extends QueryHandler<TicketInfoEntity> {
	constructor(private readonly ticketInfoRepository: TicketInfoRepository) {
		super();
	}

	async query(id: string): Promise<TicketInfoEntity> {
		return this.ticketInfoRepository.findByIdOrThrow({ id });
	}
}
