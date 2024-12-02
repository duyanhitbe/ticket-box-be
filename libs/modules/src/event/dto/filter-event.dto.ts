import { BaseFilterDto } from '@lib/base/dto';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_EVENT_TYPE } from '@lib/modules/event';
import { IsOptional } from 'class-validator';

export class FilterEventDto extends BaseFilterDto {
	/**
	 * Loại sự kiện
	 */
	@IsOptional()
	@SwaggerProperty({
		enum: ENUM_EVENT_TYPE,
		enumName: 'ENUM_EVENT_TYPE'
	})
	@Property('Loại sự kiện')
	eventType?: ENUM_EVENT_TYPE;
}
