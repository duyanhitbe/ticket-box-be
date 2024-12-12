import { ExecuteHandler } from '@lib/common/abstracts';
import { Injectable } from '@nestjs/common';
import { UpdateManyTicketPriceDto } from '@lib/modules/ticket-price/dto/update-many-ticket-price.dto';
import { UpdateTicketPriceUseCase } from './update-ticket-price.usecase';

@Injectable()
export class UpdateManyTicketPriceUseCase extends ExecuteHandler<string[]> {
	constructor(private readonly updateTicketPriceUseCase: UpdateTicketPriceUseCase) {
		super();
	}

	async execute({ data }: UpdateManyTicketPriceDto): Promise<string[]> {
		const ticketPriceEntities = await Promise.all(
			data.map(async (dto) => this.updateTicketPriceUseCase.execute(dto.id, dto))
		);
		return ticketPriceEntities.map((entity) => entity.id);
	}
}
