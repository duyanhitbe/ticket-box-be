import { ExecuteHandler } from '@lib/common/abstracts';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ExcelService } from '@lib/core/excel';
import { Workbook } from 'exceljs';
import { ImportTicketDataDto, TicketRepository } from '@lib/modules/ticket';
import { TicketInfoEntity, TicketInfoRepository } from '@lib/modules/ticket-info';

@Injectable()
export class ImportTicketUseCase extends ExecuteHandler {
	constructor(
		private readonly excelService: ExcelService,
		private readonly ticketInfoRepository: TicketInfoRepository,
		private readonly ticketRepository: TicketRepository
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

	private async validate(data: ImportTicketDataDto[]): Promise<[TicketInfoEntity, string][]> {
		return await Promise.all(
			data.map(async ({ ticketInfoCode, ticketCode }, i) => {
				const ticketInfo = await this.ticketInfoRepository.findOneOrThrow({
					where: { code: ticketInfoCode },
					select: ['id', 'code', 'eventId', 'ticketGroupId']
				});
				const existTicket = await this.ticketRepository.findOne({
					where: {
						eventId: ticketInfo.eventId,
						code: ticketCode
					}
				});
				if (existTicket) {
					throw new BadRequestException(`Mã vé đã tồn tại ở dòng thứ ${i + 2}`);
				}
				return [ticketInfo, ticketCode];
			})
		);
	}

	private async saveTicket(data: [TicketInfoEntity, string][]) {
		return await Promise.all(
			data.map(async ([{ id: ticketInfoId, eventId, ticketGroupId }, code]) =>
				this.ticketRepository.create({
					data: {
						ticketInfoId,
						eventId,
						ticketGroupId,
						code
					}
				})
			)
		);
	}
}
