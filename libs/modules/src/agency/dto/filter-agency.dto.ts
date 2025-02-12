import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterAgencyDto extends BaseFilterDto {
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã cấp đại lý')
	agencyLevelId?: string;
}
