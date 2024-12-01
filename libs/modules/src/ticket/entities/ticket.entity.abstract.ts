import { BaseEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { EventEntity } from '@lib/modules/event';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { OrderEntity } from '@lib/modules/order';
import { CustomerEntity } from '@lib/modules/customer';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class TicketEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Mã nhóm vé
	 */
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;

	/**
	 * Mã thông tin vé
	 */
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	ticketInfoId!: string;

	/**
	 * Mã đơn hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('Mã đơn hàng')
	orderId?: string;

	/**
	 * Mã khách hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('Mã khách hàng')
	customerId?: string;

	/**
	 * Mã code đơn vé
	 */
	@SwaggerProperty()
	@Property('Mã code đơn vé')
	code!: string;

	/**
	 * Ngày sử dụng vé
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày sử dụng vé')
	useAt?: Date;

	/**
	 * Ngày hết hạn của vé
	 */
	@SwaggerProperty({ required: false })
	@Property('Ngày hết hạn của vé')
	expiresAt?: Date;

	/**
	 * Giá gốc của vé
	 */
	@SwaggerProperty({ required: false })
	@Property('Giá gốc của vé')
	basePrice?: number;

	/**
	 * Loại giảm giá của vé
	 */
	@SwaggerProperty({
		enum: ENUM_DISCOUNT_TYPE,
		enumName: 'ENUM_DISCOUNT_TYPE',
		required: false
	})
	@Property('Loại giảm giá của vé')
	discountType?: ENUM_DISCOUNT_TYPE;

	/**
	 * Giá trị giảm giá của vé
	 */
	@SwaggerProperty({ required: false })
	@Property('Giá trị giảm giá của vé')
	discountValue?: number;

	/**
	 * Giá sau giảm của vé
	 */
	@SwaggerProperty({ required: false })
	@Property('Giá sau giảm của vé')
	discountedPrice?: number;

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;

	/**
	 * Nhóm vé
	 */
	ticketGroup?: TicketGroupEntity;

	/**
	 * Thông tin vé
	 */
	ticketInfo?: TicketInfoEntity;

	/**
	 * Đơn hàng
	 */
	order?: OrderEntity;

	/**
	 * Khách hàng
	 */
	customer?: CustomerEntity;
}
