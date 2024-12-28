import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterUserDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `username`')
	search?: string;
}
