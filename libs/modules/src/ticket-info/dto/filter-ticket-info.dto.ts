import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterTicketInfoDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `name`, `code`')
	search?: string;

	/**
	 * Mã nhóm vé
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã nhóm vé')
	ticketGroupId?: string;

	/**
	 * Mã sự kiện
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId?: string;
}
