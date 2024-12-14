import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupDto,
	TicketGroupListEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketGroupUseCase extends QueryHandler<
	PaginationResponse<TicketGroupListEntity>
> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(filter: FilterTicketGroupDto): Promise<PaginationResponse<TicketGroupListEntity>> {
		const { data, meta } = await this.ticketGroupRepository.findPaginated({
			...filter,
			relations: ['dates', 'event']
		});
		const result: TicketGroupListEntity[] = [];

		data.forEach((ticketGroup) => {
			const detail = new TicketGroupListEntity();
			Object.assign(detail, ticketGroup);
			detail.dates = ticketGroup.dates?.map((item) => item.date);
			detail.eventName = ticketGroup.event?.name;
			result.push(detail);
		});

		return { data: result, meta };
	}
}
