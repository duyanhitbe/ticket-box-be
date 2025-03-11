import { ExecuteHandler } from '@lib/common/abstracts';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ExcelService } from '@lib/core/excel';
import { Workbook } from 'exceljs';
import { ImportTicketDataDto, TicketRepository } from '@lib/modules/ticket';
import { TicketInfoEntity, TicketInfoRepository } from '@lib/modules/ticket-info';
import { TicketService } from '../ticket.service';

type Ticket = {
	ticketInfo: TicketInfoEntity;
	ticketCode: string;
};

@Injectable()
export class ImportTicketUseCase extends ExecuteHandler {
	constructor(
		private readonly excelService: ExcelService,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketRepository: TicketRepository,
		private readonly ticketService: TicketService
	) {
		super();
	}

	async execute(file: Express.Multer.File) {
		const workbook = new Workbook();
		const data = await this.excelService.getDataFromFile<ImportTicketDataDto[]>(
			workbook,
			'TICKET',
			file
		);

		const ticketInfos = await this.validate(data);
		await this.saveTicket(ticketInfos);

		return data;
	}

	private async validate(data: ImportTicketDataDto[]): Promise<Ticket[]> {
		return await Promise.all(
			data.map(async ({ ticketInfoCode, ticketCode }, i) => {
				const ticketInfo =
					await this.ticketInfoRepository.findByCodeForCreateTicket(ticketInfoCode);
				const existTicket = await this.ticketRepository.findOne({
					where: {
						eventId: ticketInfo.eventId,
						code: ticketCode
					}
				});
				if (existTicket) {
					throw new BadRequestException(`Mã vé đã tồn tại ở dòng thứ ${i + 2}`);
				}
				return {
					ticketInfo,
					ticketCode
				};
			})
		);
	}

	private async saveTicket(data: Ticket[]) {
		await Promise.all(
			data.map(async ({ ticketInfo, ticketCode }) => {
				const { id: ticketInfoId, eventId, ticketGroupId } = ticketInfo;
				const expiresAt = this.ticketService.getTicketExpireDate(ticketInfo.ticketGroup);
				await this.ticketRepository.create({
					data: {
						ticketInfoId,
						eventId,
						ticketGroupId,
						code: ticketCode,
						expiresAt
					}
				});
				await this.ticketInfoRepository.increment({
					where: { id: ticketInfoId },
					column: 'quantity',
					value: 1
				});
			})
		);
	}
}
