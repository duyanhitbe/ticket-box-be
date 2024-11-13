import { SwaggerOptions } from './type';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IListResponse, IResponse } from '@lib/common/interfaces';
import { PaginationMeta } from '@lib/base/dto';

export function SwaggerResponseType<T>(type: Type<T>, status = 200) {
	class ClassResponse implements IResponse {
		@ApiProperty({ example: status })
		statusCode!: number;

		@ApiProperty({ example: 'success' })
		message!: string;

		@ApiProperty({ type })
		data!: T;
	}

	Object.defineProperty(ClassResponse, 'name', { value: `${type.name}Response` });

	return ClassResponse;
}

export function SwaggerListResponseType<T>(type: Type<T>) {
	class ClassListResponse implements IListResponse {
		@ApiProperty({ example: 200 })
		statusCode!: number;

		@ApiProperty({ example: 'success' })
		message!: string;

		@ApiProperty({ type: [type] })
		data!: T[];

		@ApiProperty()
		meta!: PaginationMeta;
	}

	Object.defineProperty(ClassListResponse, 'name', { value: `List${type.name}Response` });

	return ClassListResponse;
}

export function SwaggerCreatedResponse(options: SwaggerOptions) {
	const { summary, type } = options;

	return applyDecorators(
		ApiOperation({ summary }),
		ApiCreatedResponse({ type: SwaggerResponseType(type, 201) })
	);
}

export function SwaggerOkResponse(options: SwaggerOptions) {
	const { summary, type } = options;

	return applyDecorators(
		ApiOperation({ summary }),
		ApiOkResponse({ type: SwaggerResponseType(type) })
	);
}

export function SwaggerListResponse(options: SwaggerOptions) {
	const { summary, type } = options;

	return applyDecorators(
		ApiOperation({ summary }),
		ApiOkResponse({ type: SwaggerListResponseType(type) })
	);
}
