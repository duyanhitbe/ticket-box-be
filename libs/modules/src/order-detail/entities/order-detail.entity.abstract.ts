import { BaseEntity } from '@lib/base/entities';
import { OrderEntity } from '@lib/modules/order';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { TicketEntity } from '@lib/modules/ticket';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class OrderDetailEntity extends BaseEntity {
	/**
	 * Mã đơn hàng
	 */
	@SwaggerProperty()
	@Property('Mã đơn hàng')
	orderId!: string;

	/**
	 * Mã nhóm vé
	 */
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;

	/**
	 * Mã vé
	 */
	@SwaggerProperty()
	@Property('Mã vé')
	ticketId!: string;

	/**
	 * Tên vé
	 */
	@SwaggerProperty()
	@Property('Tên vé')
	ticketName!: string;

	/**
	 * Giá gốc của vé
	 */
	@SwaggerProperty()
	@Property('Giá gốc của vé')
	ticketBasePrice!: number;

	/**
	 * Loại giảm giá của vé
	 */
	@SwaggerProperty({
		enum: ENUM_DISCOUNT_TYPE,
		enumName: 'ENUM_DISCOUNT_TYPE',
		required: false
	})
	@Property('Loại giảm giá của vé')
	ticketDiscountType?: ENUM_DISCOUNT_TYPE;

	/**
	 * Giá trị giảm giá của vé
	 */
	@SwaggerProperty({ required: false })
	@Property('Giá trị giảm giá của vé')
	ticketDiscountValue?: number;

	/**
	 * Giá sau giảm của vé
	 */
	@SwaggerProperty()
	@Property('Giá sau giảm của vé')
	ticketDiscountedPrice!: number;

	/**
	 * Số lượng vé
	 */
	@SwaggerProperty()
	@Property('Số lượng vé')
	quantity!: number;

	/**
	 * Tổng giá trị
	 */
	@SwaggerProperty()
	@Property('Tổng giá trị')
	totalPrice!: number;

	/* ========== Relations ========== */

	/**
	 * Đơn hàng
	 */
	order?: OrderEntity;

	/**
	 * Nhóm vé
	 */
	ticketGroup?: TicketGroupEntity;

	/**
	 * Vé
	 */
	ticket?: TicketEntity;
}
