import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TicketInfoRepository } from '@lib/modules/ticket-info';
import { QueryHandler } from '@lib/common/abstracts';
import { FilterTicketInfoByGroupDto } from '@lib/modules/ticket-info/dto/filter-ticket-info-by-group.dto';
import { CustomerRoleRepository, ENUM_CUSTOMER_ROLE_CODE } from '@lib/modules/customer-role';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-group.entity.abstract';

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
		customerRoleId?: string
	): Promise<TicketInfoByGroupEntity[]> {
		if (!customerRoleId) {
			const customerRole = await this.customerRoleRepository.findOne({
				where: {
					code: ENUM_CUSTOMER_ROLE_CODE.NORMAL_CUSTOMER
				},
				select: ['id']
			});
			if (!customerRole) {
				throw new InternalServerErrorException('Invalid data');
			}
			customerRoleId = customerRole.id;
		}

		return this.ticketInfoRepository.findPaginatedByGroup(filter.ticketGroupId, customerRoleId);
	}
}
