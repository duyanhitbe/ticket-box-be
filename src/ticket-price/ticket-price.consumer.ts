import { Logging } from '@lib/common/decorators';
import { EventRepository } from '@lib/modules/event';
import {
	TICKET_INFO_EVENTS,
	TicketInfoCreatedPayload,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { CreateTicketPriceDto, TicketPriceRepository } from '@lib/modules/ticket-price';
import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { In } from 'typeorm';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import {
	AGENCY_LEVEL_EVENTS,
	AgencyLevelCreatedPayload,
	AgencyLevelDeletedPayload,
	AgencyLevelRepository
} from '@lib/modules/agency-level';

@Controller()
@Logging()
export class TicketPriceConsumer {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly eventRepository: EventRepository,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketPriceRepository: TicketPriceRepository,
		private readonly agencyLevelRepository: AgencyLevelRepository,
		private readonly createTicketPriceUsecase: CreateTicketPriceUseCase
	) {}

	@OnEvent(TICKET_INFO_EVENTS.CREATED)
	async onTicketInfoCreated(payload: TicketInfoCreatedPayload) {
		const { ticketInfoId, price } = payload;

		const agencyLevels = await this.agencyLevelRepository.find({
			select: ['id']
		});

		//For normal customer
		agencyLevels.push({ id: null } as any);

		try {
			return await Promise.all(
				agencyLevels.map((agencyLevel) => {
					const data: CreateTicketPriceDto = {
						ticketInfoId,
						basePrice: price,
						agencyLevelId: agencyLevel.id
					};
					return this.createTicketPriceUsecase.execute(data);
				})
			);
		} finally {
			this.logger.log(`${agencyLevels.length} ticket price was created successfully!`);
		}
	}

	@OnEvent(AGENCY_LEVEL_EVENTS.CREATED)
	async onCustomerRoleCreated(payload: AgencyLevelCreatedPayload) {
		const { agencyLevelId } = payload;
		const events = await this.eventRepository.find({
			select: ['id']
		});
		let count = 0;
		try {
			return await Promise.all(
				events.map(async ({ id: eventId }) => {
					const ticketInfos = await this.ticketInfoRepository.find({
						where: { eventId },
						select: ['id', 'ticketGroupId']
					});
					return await Promise.all(
						ticketInfos.map(async ({ id: ticketInfoId, ticketGroupId }) => {
							count += 1;
							const existTicketPrice =
								await this.ticketPriceRepository.findNormalCustomerByTicketInfo(
									ticketInfoId
								);
							return this.ticketPriceRepository.create({
								data: {
									agencyLevelId,
									eventId,
									ticketInfoId,
									ticketGroupId,
									basePrice: existTicketPrice?.basePrice || 0,
									discountedPrice: existTicketPrice?.discountedPrice || 0,
									discountType: existTicketPrice?.discountType,
									discountValue: existTicketPrice?.discountValue
								}
							});
						})
					);
				})
			);
		} finally {
			this.logger.log(`${count} ticket price was created successfully!`);
		}
	}

	@OnEvent(AGENCY_LEVEL_EVENTS.DELETED)
	async onCustomerRoleDeleted(payload: AgencyLevelDeletedPayload) {
		const { agencyLevelId } = payload;
		const events = await this.eventRepository.find({
			select: ['id']
		});
		const eventIds = events.map((event) => event.id);
		try {
			return this.ticketPriceRepository.delete({
				where: {
					agencyLevelId,
					eventId: In(eventIds)
				}
			});
		} finally {
			this.logger.log(`Ticket price in ${eventIds.length} events was removed successfully!`);
		}
	}
}
