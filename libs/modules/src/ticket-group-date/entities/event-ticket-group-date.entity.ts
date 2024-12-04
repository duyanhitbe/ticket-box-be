import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class EventTicketGroupDateEntity {
	/**
	 * Ngày diễn ra sự kiện
	 */
	@SwaggerProperty({ type: [Date], required: false })
	@Property('Ngày diễn ra sự kiện')
	dates?: Date[];

	/**
	 * Ngày bắt đầu diễn ra sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày bắt đầu diễn ra sự kiện')
	fromDate?: Date;

	/**
	 * Ngày kết thúc ra sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày kết thúc ra sự kiện')
	toDate?: Date;
}
