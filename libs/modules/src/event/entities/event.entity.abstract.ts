import { BaseEntity } from '@lib/base/entities';
import { ENUM_EVENT_TYPE } from '@lib/modules/event';
import { ENUM_DATE_TYPE } from '@lib/modules/common';

export abstract class EventEntity extends BaseEntity {
	/**
	 * Tên sự kiện
	 */
	name!: string;

	/**
	 * Loại sự kiện
	 */
	eventType!: ENUM_EVENT_TYPE;

	/**
	 * Hình banner
	 */
	banner!: string;

	/**
	 * Hình thumbnail
	 */
	thumbnail!: string;

	/**
	 * Mô tả
	 */
	description?: string;

	/**
	 * Số sao đánh giá
	 */
	ratingStar!: number;

	/**
	 * Giá hiển thị
	 */
	displayPrice!: number;

	/**
	 * Sử dụng làm banner
	 */
	isBanner!: boolean;

	/**
	 * Thứ tự khi được sử dụng làm banner
	 */
	order!: number;

	/**
	 * Địa điểm
	 */
	location?: string;

	/**
	 * Loại ngày diễn ra sự kiện
	 */
	dateType!: ENUM_DATE_TYPE;

	/**
	 * Danh sách diễn ra sự kiện
	 */
	dates?: Date[];

	/**
	 * Ngày bắt đầu sự kiện
	 */
	fromDate?: Date;

	/**
	 * Ngày kết thúc sự kiện
	 */
	toDate?: Date;
}
