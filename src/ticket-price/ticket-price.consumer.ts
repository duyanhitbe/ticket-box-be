import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TICKET_INFO_EVENTS, TicketInfoCreatedPayload } from '@lib/modules/ticket-info';
import { CustomerRoleRepository } from '@lib/modules/customer-role';
import { CreateTicketPriceUseCase } from './usecases/create-ticket-price.usecase';
import { CreateTicketPriceDto } from '@lib/modules/ticket-price';

@Controller()
export class TicketPriceConsumer {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly customerRoleRepository: CustomerRoleRepository,
		private readonly createTicketPriceUsecase: CreateTicketPriceUseCase
	) {}

	@OnEvent(TICKET_INFO_EVENTS.CREATED)
	async onTicketInfoCreated(payload: TicketInfoCreatedPayload) {
		const { ticketInfoId } = payload;

		const customerRoles = await this.customerRoleRepository.find({
			select: ['id']
		});

		try {
			return Promise.all(
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
			this.logger.log(`${customerRoles} ticket price was created successfully!`);
		}
	}
}
