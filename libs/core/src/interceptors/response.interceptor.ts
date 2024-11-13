import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const response = context.switchToHttp().getResponse();
		const statusCode = response.statusCode;

		return next.handle().pipe(
			map((data) => {
				if (data.data && data.meta) {
					return {
						statusCode,
						message: 'success',
						data: data.data,
						meta: data.meta
					};
				}

				return {
					statusCode,
					message: 'success',
					data
				};
			})
		);
	}
}
