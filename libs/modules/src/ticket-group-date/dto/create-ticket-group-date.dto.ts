import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateTicketGroupDateDto {
	/**
	 * Mã nhóm vé
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;

	/**
	 * Mã sự kiện
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Ngày diễn ra sự kiện
	 */
	@SwaggerProperty()
	@Property('Ngày diễn ra sự kiện')
	date!: Date;
}
