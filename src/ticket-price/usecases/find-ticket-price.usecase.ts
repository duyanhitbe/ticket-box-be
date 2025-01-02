import { Injectable } from '@nestjs/common';
import {
	FilterTicketPriceDto,
	ListTicketPriceEntity,
	TicketPriceRepository
} from '@lib/modules/ticket-price';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketPriceUseCase extends QueryHandler<
	PaginationResponse<ListTicketPriceEntity>
> {
	constructor(private readonly ticketPriceRepository: TicketPriceRepository) {
		super();
	}

	async query(filter: FilterTicketPriceDto): Promise<PaginationResponse<ListTicketPriceEntity>> {
		return (await this.ticketPriceRepository.findPaginated(filter)) as any;
	}
}
