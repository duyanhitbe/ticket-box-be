import { Injectable } from '@nestjs/common';
import {
	CreateTicketGroupDto,
	TicketGroupEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async execute(data: CreateTicketGroupDto): Promise<TicketGroupEntity> {
		return this.ticketGroupRepository.create({ data });
	}
}
