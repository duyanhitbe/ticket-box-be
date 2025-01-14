import { Injectable } from '@nestjs/common';
import { QueryHandler } from '@lib/common/abstracts';
import { Buffer, Workbook } from 'exceljs';
import { ExcelService } from '@lib/core/excel';

@Injectable()
export class GetImportTicketTemplateUseCase extends QueryHandler<Buffer> {
	constructor(private readonly excelService: ExcelService) {
		super();
	}

	async query() {
		const workbook = new Workbook();
		this.excelService.newSheet(workbook, 'TICKET');
		return workbook.xlsx.writeBuffer();
	}
}
