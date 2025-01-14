import { Injectable } from '@nestjs/common';
import { QueryHandler } from '@lib/common/abstracts';
import { Buffer, Workbook } from 'exceljs';

@Injectable()
export class GetImportTicketTemplateUseCase extends QueryHandler<Buffer> {
	async query() {
		const workbook = new Workbook();
		const worksheet = workbook.addWorksheet('data');

		worksheet.columns = [
			{
				header: 'Mã thông tin vé',
				key: 'ticket_info_code',
				width: 15
			},
			{ header: 'Mã vé', key: 'ticket_code', width: 15 }
		];

		worksheet.addRow({
			ticket_info_code: 'INFO001',
			ticket_code: 'TICKET001'
		});

		return workbook.xlsx.writeBuffer();
	}
}
