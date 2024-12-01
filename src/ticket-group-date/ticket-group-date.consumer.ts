import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
	TICKET_GROUP_EVENTS,
	TicketGroupCreatedPayload,
	TicketGroupUpdatedPayload
} from '@lib/modules/ticket-group';
import { CreateTicketGroupDateUseCase } from './usecases/create-ticket-group-date.usecase';
import { TicketGroupDateRepository } from '@lib/modules/ticket-group-date';

@Controller()
export class TicketGroupDateConsumer {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly ticketGroupDateRepository: TicketGroupDateRepository,
		private readonly createTicketGroupDateUsecase: CreateTicketGroupDateUseCase
	) {}

	@OnEvent(TICKET_GROUP_EVENTS.CREATED)
	async onTicketGroupCreated(payload: TicketGroupCreatedPayload) {
		const { eventId, ticketGroupId, dates } = payload;

		try {
			return Promise.all(
				dates.map((date) =>
					this.createTicketGroupDateUsecase.execute({
						eventId,
						ticketGroupId,
						date
					})
				)
			);
		} finally {
			this.logger.log(`${dates.length} ticket group date created successfully`);
		}
	}

	@OnEvent(TICKET_GROUP_EVENTS.UPDATED)
	async onTicketGroupUpdated(payload: TicketGroupUpdatedPayload) {
		const { eventId, ticketGroupId, dates } = payload;

		const ticketGroupDates = await this.ticketGroupDateRepository.delete({
			where: {
				ticketGroupId
			},
			select: ['id']
		});
		this.logger.log(`${ticketGroupDates.length} ticket group date was deleted`);

		try {
			return Promise.all(
				dates.map((date) =>
					this.createTicketGroupDateUsecase.execute({
						eventId,
						ticketGroupId,
						date
					})
				)
			);
		} finally {
			this.logger.log(`${dates.length} ticket group date was created successfully`);
		}
	}
}
