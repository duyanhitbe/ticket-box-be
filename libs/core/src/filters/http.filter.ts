import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
	constructor(private readonly i18nService: I18nService) {}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();

		if (exception instanceof I18nValidationException) {
			return this.handleValidation(exception, request, response);
		}

		const statusCode = exception.getStatus();
		const exceptionResponse = exception.getResponse();
		const path = request.path;

		response.status(statusCode).json({
			statusCode,
			message: exceptionResponse['error'],
			success: false,
			path,
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

		const path = request.path;

		response.status(400).json({
			statusCode: 400,
			message: 'Bad request',
			success: false,
			path,
			errors
		});
	}
}
