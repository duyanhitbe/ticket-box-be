import { Injectable } from '@nestjs/common';
import {
	CreateTicketInfoDto,
	TICKET_INFO_EVENTS,
	TicketInfoCreatedPayload,
	TicketInfoEntity,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { ExecuteHandler } from '@lib/common/abstracts';
import { TicketGroupRepository } from '@lib/modules/ticket-group';
import { EventEmitterService } from '@lib/core/event';

@Injectable()
export class CreateTicketInfoUseCase extends ExecuteHandler<TicketInfoEntity> {
	constructor(
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly eventEmitterService: EventEmitterService
	) {
		super();
	}

	async execute(data: CreateTicketInfoDto): Promise<TicketInfoEntity> {
		const { ticketGroupId, name, quantity, price, order } = data;

		const { eventId } = await this.ticketGroupRepository.findByIdOrThrow({
			id: ticketGroupId,
			select: ['eventId']
		});

		const ticketInfo = await this.ticketInfoRepository.create({
			data: {
				ticketGroupId,
				name,
				quantity,
				eventId,
				order
			}
		});

		const payload: TicketInfoCreatedPayload = {
			ticketInfoId: ticketInfo.id,
			quantity,
			price,
			skipUpdateTicketInfo: true
		};
		this.eventEmitterService.emit(TICKET_INFO_EVENTS.CREATED, payload);

		return ticketInfo;
	}
}
