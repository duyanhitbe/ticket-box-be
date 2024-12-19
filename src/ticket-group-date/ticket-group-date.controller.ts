import { SwaggerOkResponse, UseAuth } from '@lib/common/decorators';
import {
	EventTicketGroupDateEntity,
	FilterTicketGroupDateDto
} from '@lib/modules/ticket-group-date';
import { Controller, Get, Query } from '@nestjs/common';
import { FindTicketGroupDateUseCase } from './usecases/find-ticket-group-date.usecase';

@Controller('ticket-group-dates')
@UseAuth({ isPublic: true })
export class TicketGroupDateController {
	constructor(private readonly findTicketGroupDateUseCase: FindTicketGroupDateUseCase) {}

	/**
	 * @path GET /api/v1/ticket-group-dates
	 * @param filter {FilterTicketGroupDateDto}
	 * @returns {Promise<EventTicketGroupDateEntity>}
	 */
	@Get()
	@SwaggerOkResponse({ summary: 'List ticket-group-date', type: EventTicketGroupDateEntity })
	findAll(@Query() filter: FilterTicketGroupDateDto): Promise<EventTicketGroupDateEntity> {
		return this.findTicketGroupDateUseCase.query(filter);
	}
}
