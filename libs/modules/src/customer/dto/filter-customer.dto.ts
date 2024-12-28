import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterCustomerDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `name`, `phone`, `email`')
	search?: string;

	/**
	 * Mã nhóm quyền
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã nhóm quyền')
	customerRoleId?: string;
}
