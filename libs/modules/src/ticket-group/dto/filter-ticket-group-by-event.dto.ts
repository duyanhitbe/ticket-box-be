import {
	I18nIsNotEmpty,
	I18nIsString,
	I18nIsUUID,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';

export class FilterTicketGroupByEventDto {
	/**
	 * Mã sự kiện
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Ngày đặt vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Ngày đặt vé')
	date!: string;
}
