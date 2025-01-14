import { Workbook, Worksheet } from 'exceljs';
import { ExcelModuleType } from './excel.constant';

export abstract class ExcelService {
	abstract newSheet(workbook: Workbook, module: ExcelModuleType): Worksheet;
}
