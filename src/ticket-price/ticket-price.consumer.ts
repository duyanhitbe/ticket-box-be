import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TICKET_INFO_EVENTS, TicketInfoCreatedPayload } from '@lib/modules/ticket-info';
import { CustomerRoleRepository, ENUM_CUSTOMER_ROLE_CODE } from '@lib/modules/customer-role';
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

		const customerRole = await this.customerRoleRepository.findOne({
			where: {
				code: ENUM_CUSTOMER_ROLE_CODE.NORMAL_CUSTOMER
			},
			select: ['id']
		});
		if (!customerRole) {
			this.logger.error('NORMAL_CUSTOMER role not found');
			return;
		}

		const data: CreateTicketPriceDto = {
			ticketInfoId,
			basePrice: 0,
			customerRoleId: customerRole.id
		};
		await this.createTicketPriceUsecase.execute(data);

		this.logger.log('Create ticket price successfully!');
	}
}
