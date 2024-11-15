import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
import { IListResponse, IResponse } from '@lib/common/interfaces';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse | IListResponse> {
		const response = context.switchToHttp().getResponse<Response>();
		const request = context.switchToHttp().getRequest<Request>();
		const statusCode = response.statusCode;
		const start = performance.now();

		return next.handle().pipe(
			map((data) => {
				const end = performance.now();
				const message = 'success';
				const success = true;
				const duration = `${(end - start).toFixed(0)}ms`;
				const path = request.path;

				if (data.data && data.meta) {
					return {
						statusCode,
						message,
						success,
						duration,
						path,
						data: data.data,
						meta: data.meta
					};
				}

				return {
					statusCode,
					message,
					success,
					duration,
					path,
					data
				};
			})
		);
	}
}
