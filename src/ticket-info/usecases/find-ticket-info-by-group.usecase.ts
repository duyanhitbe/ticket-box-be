import { Injectable } from '@nestjs/common';
import {
	FilterTicketInfoByGroupDto,
	TicketInfoByGroupEntity,
	TicketInfoRepository
} from '@lib/modules/ticket-info';
import { QueryHandler } from '@lib/common/abstracts';
import { CustomerRoleRepository } from '@lib/modules/customer-role';

@Injectable()
export class FindTicketInfoByGroupUseCase extends QueryHandler<TicketInfoByGroupEntity[]> {
	constructor(
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly customerRoleRepository: CustomerRoleRepository
	) {
		super();
	}

	async query(
		filter: FilterTicketInfoByGroupDto,
		userRoleId?: string
	): Promise<TicketInfoByGroupEntity[]> {
		const customerRoleId = await this.customerRoleRepository.getCustomerRoleId(userRoleId);

		return this.ticketInfoRepository.findAllWithPriceByGroup(
			filter.ticketGroupId,
			customerRoleId
		);
	}
}
