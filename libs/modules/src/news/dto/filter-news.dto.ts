import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsString, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterNewsDto extends BaseFilterDto {}

export class FilterDetailNewsDto {
	@IsOptional()
	@I18nIsString()
	@SwaggerProperty({ required: false })
	@Property('Slug')
	slug?: string;
}
