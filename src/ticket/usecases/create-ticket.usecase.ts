import { Injectable } from '@nestjs/common';
import {
	CreateTicketDto,
	TICKET_EVENTS,
	TicketEntity,
	TicketRepository,
	TicketRollbackPayload
} from '@lib/modules/ticket';
import { ExecuteHandler } from '@lib/common/abstracts';
import { TicketInfoRepository } from '@lib/modules/ticket-info';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CreateTicketUseCase extends ExecuteHandler<TicketEntity[]> {
	constructor(
		@InjectDataSource()
		private readonly dataSource: DataSource,
		private readonly ticketRepository: TicketRepository,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly eventEmitter: EventEmitter2
	) {
		super();
	}

	async execute(data: CreateTicketDto): Promise<TicketEntity[]> {
		const { ticketInfoId, quantity } = data;

		const ticketInfo = await this.ticketInfoRepository.findByIdForCreateTicket(ticketInfoId);
		if (!ticketInfo) {
			throw new Error('Ticket info is null');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.startTransaction();

		try {
			const tickets: TicketEntity[] = [];
			for (let i = 0; i < quantity; i++) {
				const ticket = await this.ticketRepository.createByTicketInfo(
					ticketInfo,
					queryRunner
				);
				tickets.push(ticket);
			}
			await queryRunner.commitTransaction();
			return tickets;
		} catch (err) {
			this.logger.error(err);
			await queryRunner.rollbackTransaction();
			const payload: TicketRollbackPayload = {
				ticketInfoId
			};
			this.eventEmitter.emit(TICKET_EVENTS.ROLLBACK, payload);
			throw err;
		} finally {
			await queryRunner.release();
		}
	}
}
