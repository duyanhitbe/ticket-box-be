import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { loggingIncomingRequest } from '@lib/core/logger';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly i18nService: I18nService) {}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		loggingIncomingRequest(request, this.logger);

		if (exception instanceof I18nValidationException) {
			return this.handleValidation(exception, request, response);
		}

		const statusCode = exception.getStatus();
		const exceptionResponse = exception.getResponse();

		this.logError(request, exceptionResponse['message']);

		response.status(statusCode).json({
			statusCode,
			message: exceptionResponse['error'],
			success: false,
			path: request.path,
			errors: [exceptionResponse['message']]
		});
	}

	handleValidation(exception: any, request: Request, response: Response) {
		const errors = exception['errors'].map((err) => {
			const message: string[] = [];
			const values: string[] = Object.values(err['constraints'] as any);

			values.forEach((value) => {
				const [key, args] = value.split('|');
				if (args) {
					message.push(
						this.i18nService.translate(key, {
							args: JSON.parse(args)
						})
					);
				} else {
					message.push(value);
				}
			});

			return {
				property: err.property,
				message
			};
		});

		this.logError(request, 'Validation error');
		this.logger.error(JSON.stringify(errors, null, 2));

		response.status(400).json({
			statusCode: 400,
			message: 'Bad request',
			success: false,
			path: request.path,
			errors
		});
	}

	private logError(request: Request, message: string) {
		const path = request.path;
		const method = request.method;
		this.logger.error(`[${method}] ${path} - ${message}`);
	}
}
