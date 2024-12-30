import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterCustomerRoleDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `name`, `code`')
	search?: string;
}
