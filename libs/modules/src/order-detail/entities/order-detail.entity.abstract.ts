import { BaseEntity } from '@lib/base/entities';
import { OrderEntity } from '@lib/modules/order';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { TicketEntity } from '@lib/modules/ticket';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';

export abstract class OrderDetailEntity extends BaseEntity {
	/**
	 * Mã đơn hàng
	 */
	orderId!: string;

	/**
	 * Mã nhóm vé
	 */
	ticketGroupId!: string;

	/**
	 * Mã vé
	 */
	ticketId!: string;

	/**
	 * Tên vé
	 */
	ticketName!: string;

	/**
	 * Giá gốc của vé
	 */
	ticketBasePrice!: number;

	/**
	 * Loại giảm giá của vé
	 */
	ticketDiscountType?: ENUM_DISCOUNT_TYPE;

	/**
	 * Giá trị giảm giá của vé
	 */
	ticketDiscountValue?: number;

	/**
	 * Giá sau giảm của vé
	 */
	ticketDiscountedPrice!: number;

	/**
	 * Số lượng vé
	 */
	quantity!: number;

	/**
	 * Tổng giá trị
	 */
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
