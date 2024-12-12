import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketGroupDateDto {
	/**
	 * Mã sự kiện
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;
}
