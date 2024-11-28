import { Injectable } from '@nestjs/common';
import {
	TicketGroupEntity,
	TicketGroupRepository,
	UpdateTicketGroupDto
} from '@lib/modules/ticket-group';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateTicketGroupUseCase extends ExecuteHandler<TicketGroupEntity> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async execute(id: string, data: UpdateTicketGroupDto): Promise<TicketGroupEntity> {
		return this.ticketGroupRepository.updateById({ id, data });
	}
}
