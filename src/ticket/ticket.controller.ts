import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { CreateTicketDto, FilterTicketDto, TicketEntity } from '@lib/modules/ticket';
import { CreateTicketUseCase } from './usecases/create-ticket.usecase';
import { FindTicketUseCase } from './usecases/find-ticket.usecase';
import { DetailTicketUseCase } from './usecases/detail-ticket.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { GetImportTicketTemplateUseCase } from './usecases/get-import-ticket-template.usecase';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportTicketUseCase } from './usecases/import-ticket.usecase';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('tickets')
@UseAuth()
export class TicketController {
	constructor(
		private readonly createTicketUseCase: CreateTicketUseCase,
		private readonly findTicketUseCase: FindTicketUseCase,
		private readonly detailTicketUseCase: DetailTicketUseCase,
		private readonly getImportTicketTemplateUseCase: GetImportTicketTemplateUseCase,
		private readonly importTicketUseCase: ImportTicketUseCase
	) {}

	/**
	 * @path POST /api/v1/tickets
	 * @param data {CreateTicketDto}
	 * @returns {Promise<string[]>}
	 */
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create more ticket', type: String, isArray: true })
	create(@Body() data: CreateTicketDto): Promise<string[]> {
		return this.createTicketUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/tickets
	 * @param filter {FilterTicketDto}
	 * @returns {Promise<PaginationResponse<TicketEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List ticket', type: TicketEntity })
	findAll(@Query() filter: FilterTicketDto): Promise<PaginationResponse<TicketEntity>> {
		return this.findTicketUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/tickets/excel
	 * @param res
	 */
	@Get('excel')
	@SwaggerOkResponse({ summary: 'Get template import ticket', type: {} })
	async getTemplate(@Res({ passthrough: false }) res: Response) {
		const buffer = await this.getImportTicketTemplateUseCase.query();
		res.header('Content-Disposition', 'attachment; filename=NhapVe.xlsx');
		res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.send(buffer);
		return {};
	}

	/**
	 * @path GET /api/v1/tickets/:id
	 * @param id {string}
	 * @returns {Promise<TicketEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail ticket', type: TicketEntity })
	findOne(@Param('id') id: string): Promise<TicketEntity> {
		return this.detailTicketUseCase.query(id);
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.importTicketUseCase.execute(file);
	}
}
