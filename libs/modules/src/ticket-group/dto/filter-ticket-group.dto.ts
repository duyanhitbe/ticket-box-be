import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketGroupDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `name`')
	search?: string;

	/**
	 * Mã sự kiện
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId?: string;

	/**
	 * Ngày đặt vé
	 */
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Ngày đặt vé')
	date?: string;
}
