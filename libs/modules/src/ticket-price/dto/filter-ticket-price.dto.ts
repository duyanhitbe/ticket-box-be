import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterTicketPriceDto extends BaseFilterDto {
	/**
	 * Mã nhóm quyền
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã nhóm quyền')
	customerRoleId?: string;
}
