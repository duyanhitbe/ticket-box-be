import { Injectable } from '@nestjs/common';
import { TicketInfoRepository } from '@lib/modules/ticket-info';
import { QueryHandler } from '@lib/common/abstracts';
import { FilterTicketInfoByGroupDto } from '@lib/modules/ticket-info/dto/filter-ticket-info-by-group.dto';
import { CustomerRoleRepository } from '@lib/modules/customer-role';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-group.entity';

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
