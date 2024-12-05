import { BaseRepository } from '@lib/base/repositories';
import { TicketInfoEntity } from '../entities/ticket-info.entity.abstract';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info/entities/ticket-info-by-group.entity';
import { DataSource } from 'typeorm';

export abstract class TicketInfoRepository extends BaseRepository<TicketInfoEntity> {
	abstract findAllWithPriceByGroup(
		ticketGroupId: string,
		customerRoleId: string
	): Promise<TicketInfoByGroupEntity[]>;

	abstract findByIdForCreateTicket(
		id: string,
		datasource?: DataSource
	): Promise<TicketInfoEntity | null>;
}
