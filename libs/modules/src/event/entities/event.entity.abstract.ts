import { BaseEntity } from '@lib/base/entities';
import { ENUM_EVENT_TYPE } from '@lib/modules/event/event.enum';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class EventEntity extends BaseEntity {
	/**
	 * Tên sự kiện
	 */
	@SwaggerProperty()
	@Property('Tên sự kiện')
	name!: string;

	/**
	 * Loại sự kiện
	 */
	@SwaggerProperty({
		enum: ENUM_EVENT_TYPE,
		enumName: 'ENUM_EVENT_TYPE'
	})
	@Property('Loại sự kiện')
	eventType!: ENUM_EVENT_TYPE;

	/**
	 * Hình ảnh
	 */
	@SwaggerProperty()
	@Property('Hình ảnh')
	image!: string;

	/**
	 * Hình thumbnail
	 */
	@SwaggerProperty()
	@Property('Hình thumbnail')
	thumbnail!: string;

	/**
	 * Mô tả
	 */
	@SwaggerProperty({ required: false })
	@Property('Mô tả')
	description?: string;

	/**
	 * Số sao đánh giá
	 */
	@SwaggerProperty()
	@Property('Số sao đánh giá')
	ratingStar!: number;

	/**
	 * Giá hiển thị
	 */
	@SwaggerProperty()
	@Property('Giá hiển thị')
	displayPrice!: number;

	/**
	 * Sử dụng làm banner
	 */
	@SwaggerProperty()
	@Property('Sử dụng làm banner')
	isBanner!: boolean;

	/**
	 * Thứ tự khi được sử dụng làm banner
	 */
	@SwaggerProperty()
	@Property('Thứ tự khi được sử dụng làm banner')
	order!: number;

	/**
	 * Địa điểm
	 */
	@SwaggerProperty({ required: false })
	@Property('Địa điểm')
	location?: string;

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
	 * Danh sách diễn ra sự kiện
	 */
	@SwaggerProperty({ type: [Date], required: false })
	@Property('Danh sách diễn ra sự kiện')
	dates?: Date[];

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
}
