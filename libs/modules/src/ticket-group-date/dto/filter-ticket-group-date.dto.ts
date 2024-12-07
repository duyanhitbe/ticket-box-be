import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketGroupDateDto extends BaseFilterDto {
	/**
	 * Mã sự kiện
	 */
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId!: string;
}
