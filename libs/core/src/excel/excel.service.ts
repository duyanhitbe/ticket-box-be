import { Injectable } from '@nestjs/common';
import { ExcelService } from './excel.abstract';
import { Column, Workbook, Worksheet } from 'exceljs';
import { EXCEL_CONSTANTS, ExcelModuleType } from './excel.constant';

@Injectable()
export class ExcelServiceImp extends ExcelService {
	newSheet(workbook: Workbook, module: ExcelModuleType): Worksheet {
		const setting = EXCEL_CONSTANTS[module];
		const worksheet = workbook.addWorksheet(setting.sheetName);
		const columns: Partial<Column>[] = [];

		Array.from(setting.columns, (value) => {
			const { header, key, required } = value;
			if (required) {
				columns.push({
					header: {
						richText: [
							{ text: header }, // Regular text
							{
								text: ' (',
								font: {
									bold: true
								}
							},
							{
								text: '*',
								font: {
									bold: true,
									color: {
										argb: 'FFFF0000'
									}
								}
							}, // Red star
							{
								text: ')',
								font: {
									bold: true
								}
							}
						]
					},
					key,
					width: header!.length + 6
				} as any);
			} else {
				columns.push({
					header,
					key,
					width: header!.length + 2
				});
			}
		});
		worksheet.columns = columns;
		worksheet.findRow(1)!.font = {
			bold: true
		};
		worksheet.findRow(1)!.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFD9EAD3' },
			bgColor: { argb: 'FFD9EAD3' }
		};
		worksheet.findRow(1)!.border = {
			top: { style: 'thin' },
			left: { style: 'thin' },
			bottom: { style: 'thin' },
			right: { style: 'thin' }
		};
		worksheet.addRows(setting.sampleData);
		return worksheet;
	}
}
