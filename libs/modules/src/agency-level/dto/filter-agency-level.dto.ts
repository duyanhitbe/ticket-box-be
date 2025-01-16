import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsNumber, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterAgencyLevelDto extends BaseFilterDto {
	@IsOptional()
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Cấp độ đại lý')
	level?: number;
}
