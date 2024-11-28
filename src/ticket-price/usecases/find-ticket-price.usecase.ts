import { Injectable } from '@nestjs/common';
import {
	FilterTicketPriceDto,
	TicketPriceEntity,
	TicketPriceRepository
} from '@lib/modules/ticket-price';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketPriceUseCase extends QueryHandler<PaginationResponse<TicketPriceEntity>> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async query(filter: FilterTicketPriceDto): Promise<PaginationResponse<TicketPriceEntity>> {
		return this.ticketPriceRepository.findPaginated(filter);
	}
}
