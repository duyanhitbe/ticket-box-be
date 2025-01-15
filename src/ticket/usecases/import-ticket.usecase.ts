import { ExecuteHandler } from '@lib/common/abstracts';
import { Injectable } from '@nestjs/common';
import { ExcelService } from '@lib/core/excel';
import { Workbook } from 'exceljs';
import { ImportTicketDataDto } from '@lib/modules/ticket';

@Injectable()
export class ImportTicketUseCase extends ExecuteHandler {
	constructor(private readonly excelService: ExcelService) {
		super();
	}

	async execute(file: Express.Multer.File) {
		const workbook = new Workbook();
		const data = await this.excelService.getDataFromFile<ImportTicketDataDto[]>(
			workbook,
			'TICKET',
			file
		);
		return data;
	}
}
