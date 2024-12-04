import { BaseRepository } from '@lib/base/repositories';
import { TicketEntity } from '../entities/ticket.entity.abstract';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { QueryRunner } from 'typeorm';

export abstract class TicketRepository extends BaseRepository<TicketEntity> {
	abstract createByTicketInfo(
		ticketInfo: TicketInfoEntity,
		queryRunner: QueryRunner
	): Promise<TicketEntity>;
}
