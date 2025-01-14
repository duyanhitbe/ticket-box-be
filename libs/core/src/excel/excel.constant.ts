import { Column } from 'exceljs';

export type ExcelModuleType = 'TICKET';

type ExcelModuleValue = {
	sheetName: string;
	columns: Partial<Column & { required: boolean }>[];
	sampleData: any[];
};

export const EXCEL_CONSTANTS: Record<ExcelModuleType, ExcelModuleValue> = {
	TICKET: {
		sheetName: 'Import vé',
		columns: [
			{
				header: 'Mã thông tin vé',
				key: 'ticket_info_code',
				required: true
			},
			{
				header: 'Mã vé',
				key: 'ticket_code',
				required: true
			}
		],
		sampleData: [
			{
				ticket_info_code: 'INFO001',
				ticket_code: 'CODE001'
			}
		]
	}
};
