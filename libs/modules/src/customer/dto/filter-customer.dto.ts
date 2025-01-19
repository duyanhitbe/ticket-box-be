import { BaseFilterDto } from '@lib/base/dto';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterCustomerDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `name`, `phone`, `email`')
	search?: string;
}
