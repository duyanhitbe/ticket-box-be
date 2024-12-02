import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IListResponse, IResponse } from '@lib/common/interfaces';
import { PaginationMeta } from '@lib/base/dto/pagination.dto';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';

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

export function SwaggerListResponseType<T>(
	type: Type<T>,
	paginated: boolean,
	isEnum: boolean,
	enumName: string
) {
	const dataOptions: ApiPropertyOptions = isEnum
		? { example: Object.values(type) }
		: { type: [type] };

	class ClassPaginatedResponse implements IListResponse {
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

		@ApiProperty(dataOptions)
		data!: T[];

		@ApiProperty()
		meta!: PaginationMeta;
	}

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

		@ApiProperty(dataOptions)
		data!: T[];
	}

	Object.defineProperty(ClassListResponse, 'name', {
		value: `List${isEnum ? enumName : type.name}Response`
	});
	Object.defineProperty(ClassPaginatedResponse, 'name', {
		value: `List${type.name}PaginatedResponse`
	});

	return paginated ? ClassPaginatedResponse : ClassListResponse;
}
