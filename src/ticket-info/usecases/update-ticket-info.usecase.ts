import { Injectable } from '@nestjs/common';
import {
	TicketInfoEntity,
	TicketInfoRepository,
	UpdateTicketInfoDto
} from '@lib/modules/ticket-info';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateTicketInfoUseCase extends ExecuteHandler<TicketInfoEntity> {
	constructor(private readonly ticketInfoRepository: TicketInfoRepository) {
		super();
	}

	async execute(id: string, data: UpdateTicketInfoDto): Promise<TicketInfoEntity> {
		return this.ticketInfoRepository.updateById({ id, data });
	}
}
