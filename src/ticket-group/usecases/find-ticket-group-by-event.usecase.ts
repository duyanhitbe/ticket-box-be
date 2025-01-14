import { Injectable } from '@nestjs/common';
import {
	FilterTicketGroupByEventDto,
	RawTicketGroupByEventEntity,
	TicketGroupByEventEntity,
	TicketGroupRepository
} from '@lib/modules/ticket-group';
import { QueryHandler } from '@lib/common/abstracts';
import { CustomerRoleRepository } from '@lib/modules/customer-role';

@Injectable()
export class FindTicketGroupByEventUseCase extends QueryHandler<TicketGroupByEventEntity[]> {
	constructor(
		private readonly ticketGroupRepository: TicketGroupRepository,
		private readonly customerRoleRepository: CustomerRoleRepository
		// private readonly redisService: RedisService
	) {
		super();
	}

	async query(
		filter: FilterTicketGroupByEventDto,
		userRoleId?: string
	): Promise<TicketGroupByEventEntity[]> {
		const { eventId, date } = filter;
		// const cachedData = await this.redisService.get({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
		// 	key: [eventId, formatDate(new Date(date), 'DD-MM-YYYY')]
		// });
		// if (cachedData) return cachedData;

		const customerRoleId = await this.customerRoleRepository.getCustomerRoleId(userRoleId);
		const rawTicketGroups = await this.ticketGroupRepository.findPaginatedByEvent(
			filter,
			customerRoleId
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
			// res.ticketInfos = res.ticketInfos.sort((a, b) => a.order - b.order);
		};

		const result = rawTicketGroups.reduce((prev: TicketGroupByEventEntity[], next) => {
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

		// this.redisService.setNx({
		// 	prefix: REDIS_PREFIX_KEY.TICKET_GROUP.EVENT,
		// 	key: [eventId, formatDate(new Date(date), 'DD-MM-YYYY')],
		// 	value: result
		// });
		return result;
	}
}
