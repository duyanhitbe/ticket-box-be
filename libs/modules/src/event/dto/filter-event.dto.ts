import { BaseFilterDto } from '@lib/base/dto';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_EVENT_TYPE } from '@lib/modules/event';
import { IsOptional } from 'class-validator';

export class FilterEventDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `name`, `location`')
	search?: string;

	/**
	 * Loại sự kiện
	 */
	@IsOptional()
	@SwaggerProperty({
		enum: ENUM_EVENT_TYPE,
		enumName: 'ENUM_EVENT_TYPE',
		required: false
	})
	@Property('Loại sự kiện')
	eventType?: ENUM_EVENT_TYPE;

	/**
	 * Tên sự kiện
	 */
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Tên sự kiện')
	name?: string;
}
