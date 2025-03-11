import { BaseRepository } from '@lib/base/repositories';
import { TicketInfoEntity } from '../entities/ticket-info.entity.abstract';
import { TicketInfoByGroupEntity, TicketInfoByIdsEntity } from '@lib/modules/ticket-info';
import { DataSource, QueryRunner } from 'typeorm';

export abstract class TicketInfoRepository extends BaseRepository<TicketInfoEntity> {
	abstract findAllWithPriceByGroup(
		ticketGroupId: string,
		agencyLevelId?: string
	): Promise<TicketInfoByGroupEntity[]>;

	abstract findByIdForCreateTicket(
		id: string,
		datasource?: DataSource
	): Promise<TicketInfoEntity>;

	abstract findByCodeForCreateTicket(id: string): Promise<TicketInfoEntity>;

	abstract findAllWithPriceByIds(
		ids: string[],
		queryRunner: QueryRunner,
		agencyLevelId?: string
	): Promise<TicketInfoByIdsEntity[]>;
}
