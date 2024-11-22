import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IListResponse, IResponse } from '@lib/common/interfaces';
import { PaginationMeta } from '@lib/base/dto/pagination.dto';

export function SwaggerResponseType<T>(type: Type<T>, status = 200) {
	class ClassResponse implements IResponse {
		@ApiProperty({ example: status })
		statusCode!: number;

		@ApiProperty({ example: 'success' })
		message!: string;

		@ApiProperty({ example: true })
		success!: boolean;

		@ApiProperty({ example: '/v1/api' })
		path!: string;

		@ApiProperty({ example: '0ms' })
		duration!: string;

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

		@ApiProperty({ example: true })
		success!: boolean;

		@ApiProperty({ example: '/v1/api' })
		path!: string;

		@ApiProperty({ example: '0ms' })
		duration!: string;

		@ApiProperty({ type: [type] })
		data!: T[];

		@ApiProperty()
		meta!: PaginationMeta;
	}

	Object.defineProperty(ClassListResponse, 'name', { value: `List${type.name}Response` });

	return ClassListResponse;
}
