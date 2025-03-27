import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsNumber, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterAgencyLevelDto extends BaseFilterDto {
	id?: string;

	@IsOptional()
	@I18nIsNumber()
	@SwaggerProperty({ required: false })
	@Property('Cấp độ đại lý')
	level?: number;
}
