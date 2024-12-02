import { BaseRepository } from '@lib/base/repositories';
import { TicketInfoEntity } from '../entities/ticket-info.entity.abstract';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-group.entity.abstract';

export abstract class TicketInfoRepository extends BaseRepository<TicketInfoEntity> {
	abstract findPaginatedByGroup(
		ticketGroupId: string,
		customerRoleId: string
	): Promise<TicketInfoByGroupEntity[]>;
}
