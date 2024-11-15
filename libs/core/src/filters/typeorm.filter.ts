import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormFilter implements ExceptionFilter {
	constructor(private readonly i18nService: I18nService) {}

	catch(exception: QueryFailedError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const code = exception['code'];
		const detail = exception['detail'];

		if (code === '23505') {
			response.status(409).json({
				statusCode: 409,
				message: 'Conflict',
				errors: [detail]
			});
			return;
		}

		response.status(500).json({
			statusCode: 500,
			message: 'Server Error'
		});
	}
}
