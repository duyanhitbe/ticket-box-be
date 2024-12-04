import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
	TICKET_INFO_EVENTS,
	TicketInfoCreatedPayload,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { CustomerRoleRepository } from '@lib/modules/customer-role';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import { CreateTicketPriceDto, TicketPriceRepository } from '@lib/modules/ticket-price';
import {
	CUSTOMER_ROLE_EVENTS,
	CustomerRoleCreatedPayload,
	CustomerRoleDeletedPayload
} from '@lib/modules/customer-role/customer-role.event';
import { EventRepository } from '@lib/modules/event';
import { In } from 'typeorm';
import { Logging } from '@lib/common/decorators';

@Controller()
@Logging()
export class TicketPriceConsumer {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly customerRoleRepository: CustomerRoleRepository,
		private readonly eventRepository: EventRepository,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketPriceRepository: TicketPriceRepository,
		private readonly createTicketPriceUsecase: CreateTicketPriceUseCase
	) {}

	@OnEvent(TICKET_INFO_EVENTS.CREATED)
	async onTicketInfoCreated(payload: TicketInfoCreatedPayload) {
		const { ticketInfoId } = payload;

		const customerRoles = await this.customerRoleRepository.find({
			select: ['id']
		});

		try {
			return await Promise.all(
				customerRoles.map((customerRole) => {
					const data: CreateTicketPriceDto = {
						ticketInfoId,
						basePrice: 0,
						customerRoleId: customerRole.id
					};
					return this.createTicketPriceUsecase.execute(data);
				})
			);
		} finally {
			this.logger.log(`${customerRoles.length} ticket price was created successfully!`);
		}
	}

	@OnEvent(CUSTOMER_ROLE_EVENTS.CREATED)
	async onCustomerRoleCreated(payload: CustomerRoleCreatedPayload) {
		const { customerRoleId } = payload;
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
							return this.ticketPriceRepository.create({
								data: {
									customerRoleId,
									eventId,
									ticketInfoId,
									ticketGroupId,
									basePrice: 0,
									discountedPrice: 0
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

	@OnEvent(CUSTOMER_ROLE_EVENTS.DELETED)
	async onCustomerRoleDeleted(payload: CustomerRoleDeletedPayload) {
		const { customerRoleId } = payload;
		const events = await this.eventRepository.find({
			select: ['id']
		});
		const eventIds = events.map((event) => event.id);
		try {
			return this.ticketPriceRepository.delete({
				where: {
					customerRoleId,
					eventId: In(eventIds)
				}
			});
		} finally {
			this.logger.log(`Ticket price in ${eventIds.length} events was removed successfully!`);
		}
	}
}
