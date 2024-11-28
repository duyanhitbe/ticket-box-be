import { Injectable } from '@nestjs/common';
import { TicketInfoEntity, TicketInfoRepository } from '@lib/modules/ticket-info';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteTicketInfoUseCase extends ExecuteHandler<TicketInfoEntity> {
	constructor(private readonly ticketInfoRepository: TicketInfoRepository) {
		super();
	}

	async execute(id: string): Promise<TicketInfoEntity> {
		return this.ticketInfoRepository.softDeleteById({ id });
	}
}
