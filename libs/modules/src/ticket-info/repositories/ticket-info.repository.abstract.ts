import { BaseRepository } from '@lib/base/repositories';
import { TicketInfoEntity } from '../entities/ticket-info.entity.abstract';
import { TicketInfoByGroupEntity, TicketInfoByIdsEntity } from '@lib/modules/ticket-info';
import { DataSource, QueryRunner } from 'typeorm';

export abstract class TicketInfoRepository extends BaseRepository<TicketInfoEntity> {
	abstract findAllWithPriceByGroup(
		ticketGroupId: string,
		customerRoleId: string
	): Promise<TicketInfoByGroupEntity[]>;

	abstract findByIdForCreateTicket(
		id: string,
		datasource?: DataSource
	): Promise<TicketInfoEntity | null>;

	abstract findAllWithPriceByIds(
		ids: string[],
		customerRoleId: string,
		queryRunner: QueryRunner
	): Promise<TicketInfoByIdsEntity[]>;
}
