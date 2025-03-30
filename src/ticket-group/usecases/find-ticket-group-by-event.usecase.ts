import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupByEventDto,
	RawTicketGroupByEventEntity,
	TicketGroupByEventEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindTicketGroupByEventUseCase extends QueryHandler<TicketGroupByEventEntity[]> {
	constructor(private readonly ticketGroupRepository: TicketGroupRepository) {
		super();
	}

	async query(
		filter: FilterTicketGroupByEventDto,
		agencyLevelId?: string
	): Promise<TicketGroupByEventEntity[]> {
		const rawTicketGroups = await this.ticketGroupRepository.findPaginatedByEvent(
			filter,
			agencyLevelId
		);

		const pushTicketInfo = (
			res: TicketGroupByEventEntity,
			item: RawTicketGroupByEventEntity
		) => {
			const haveTicketInfo = [
				item.ticketInfoId,
				item.ticketInfoName,
				item.ticketInfoQuantity,
				item.ticketInfoBasePrice,
				item.ticketInfoDiscountedPrice,
				item.ticketInfoOrder
			].every((ticketInfo) => ticketInfo !== undefined && ticketInfo !== null);

			if (haveTicketInfo) {
				res.ticketInfos.push({
					id: item.ticketInfoId!,
					name: item.ticketInfoName!,
					quantity: item.ticketInfoQuantity!,
					basePrice: item.ticketInfoBasePrice!,
					discountedPrice: item.ticketInfoDiscountedPrice!,
					order: item.ticketInfoOrder!
				});
			}
		};

		const ticketGroups = rawTicketGroups.reduce((prev: TicketGroupByEventEntity[], next) => {
			const exist = prev.find((item) => item.id === next.id);
			this.logger.debug(exist);
			if (!exist) {
				const res = new TicketGroupByEventEntity();

				res.id = next.id;
				res.name = next.name;
				res.description = next.description;
				res.ticketInfos = [];

				pushTicketInfo(res, next);

				prev.push(res);
			} else {
				pushTicketInfo(exist, next);
			}

			return prev;
		}, []);

		return ticketGroups.filter((ticketGroup) => ticketGroup.ticketInfos.length);
	}
}
