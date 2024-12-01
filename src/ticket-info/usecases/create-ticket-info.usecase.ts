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
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateTicketInfoUseCase extends ExecuteHandler<TicketInfoEntity> {
	constructor(
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly eventEmitter: EventEmitter2
	) {
		super();
	}

	async execute(data: CreateTicketInfoDto): Promise<TicketInfoEntity> {
		const { ticketGroupId, name, quantity } = data;

		const { eventId } = await this.ticketGroupRepository.findByIdOrThrow({
			id: ticketGroupId,
			select: ['eventId']
		});

		const ticketInfo = await this.ticketInfoRepository.create({
			data: {
				ticketGroupId,
				name,
				quantity,
				eventId
			}
		});

		const payload: TicketInfoCreatedPayload = {
			ticketInfoId: ticketInfo.id,
			quantity
		};
		this.eventEmitter.emit(TICKET_INFO_EVENTS.CREATED, payload);

		return ticketInfo;
	}
}
