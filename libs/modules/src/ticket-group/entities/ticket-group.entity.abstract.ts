import { BaseEntity } from '@lib/base/entities';
import { EventEntity } from '@lib/modules/event';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { TicketGroupDateEntity } from '@lib/modules/ticket-group-date';

export abstract class TicketGroupEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Tên nhóm vé
	 */
	@SwaggerProperty()
	@Property('Tên nhóm vé')
	name!: string;

	/**
	 * Mô tả
	 */
	@SwaggerProperty({ required: false })
	@Property('Mô tả')
	description?: string;

	/**
	 * Loại ngày diễn ra sự kiện
	 */
	@SwaggerProperty({
		enum: ENUM_DATE_TYPE,
		enumName: 'ENUM_DATE_TYPE'
	})
	@Property('Loại ngày diễn ra sự kiện')
	dateType!: ENUM_DATE_TYPE;

	/**
	 * Ngày bắt đầu sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày bắt đầu sự kiện')
	fromDate?: Date;

	/**
	 * Ngày kết thúc sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày kết thúc sự kiện')
	toDate?: Date;

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;

	/**
	 * Ngày diễn ra sự kiện
	 */
	dates?: TicketGroupDateEntity[];
}
