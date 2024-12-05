import { Injectable } from '@nestjs/common';
import {
	CreateTicketDto,
	TICKET_EVENTS,
	TicketEntity,
	TicketRollbackPayload
} from '@lib/modules/ticket';
import { ExecuteHandler } from '@lib/common/abstracts';
import { TicketInfoRepository, TicketInfoTypeormEntity } from '@lib/modules/ticket-info';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EventEmitterService } from '@lib/core/event';
import { TicketService } from '../ticket.service';

@Injectable()
export class CreateTicketUseCase extends ExecuteHandler<string[]> {
	constructor(
		@InjectDataSource()
		private readonly dataSource: DataSource,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly eventEmitterService: EventEmitterService,
		private readonly ticketService: TicketService
	) {
		super();
	}

	async execute(data: CreateTicketDto): Promise<string[]> {
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
				const ticket = await this.ticketService.createByTicketInfo(ticketInfo, queryRunner);
				tickets.push(ticket);
			}
			await queryRunner.manager.increment(
				TicketInfoTypeormEntity,
				{ id: ticketInfoId },
				'quantity',
				quantity
			);
			throw new Error();
			await queryRunner.commitTransaction();
			return tickets.map((item) => item.id);
		} catch (err) {
			this.logger.error(err);
			await queryRunner.rollbackTransaction();
			const payload: TicketRollbackPayload = {
				ticketInfoId
			};
			this.eventEmitterService.emit(TICKET_EVENTS.ROLLBACK, payload);
			throw err;
		} finally {
			await queryRunner.release();
		}
	}
}
