import { Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateTicketGroupDateDto {
	/**
	 * Mã nhóm vé
	 */
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;

	/**
	 * Mã sự kiện
	 */
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
