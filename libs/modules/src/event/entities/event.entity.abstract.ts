import { BaseEntity } from '@lib/base/entities';
import { ENUM_EVENT_TYPE } from '../event.enum';
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
	 * Ngày bắt đầu sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày bắt đầu sự kiện')
	startDate?: Date;
}
