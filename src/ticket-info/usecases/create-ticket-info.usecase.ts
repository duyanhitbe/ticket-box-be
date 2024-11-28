import { Injectable } from '@nestjs/common';
import {
	CreateTicketInfoDto,
	TicketInfoEntity,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateTicketInfoUseCase extends ExecuteHandler<TicketInfoEntity> {
	constructor(private readonly ticketInfoRepository: TicketInfoRepository) {
		super();
	}

	async execute(data: CreateTicketInfoDto): Promise<TicketInfoEntity> {
		return this.ticketInfoRepository.create({ data });
	}
}
