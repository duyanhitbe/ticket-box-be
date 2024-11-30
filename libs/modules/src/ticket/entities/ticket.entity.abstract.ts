import { BaseEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { EventEntity } from '@lib/modules/event';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { OrderEntity } from '@lib/modules/order';
import { CustomerEntity } from '@lib/modules/customer';

export abstract class TicketEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	eventId!: string;

	/**
	 * Mã nhóm vé
	 */
	ticketGroupId!: string;

	/**
	 * Mã thông tin vé
	 */
	ticketInfoId!: string;

	/**
	 * Mã đơn hàng
	 */
	orderId!: string;

	/**
	 * Mã khách hàng
	 */
	customerId!: string;

	/**
	 * Mã code đơn vé
	 */
	code!: string;

	/**
	 * Ngày sử dụng vé
	 */
	useAt?: Date;

	/**
	 * Ngày hết hạn của vé
	 */
	expiresAt!: Date;

	/**
	 * Giá gốc của vé
	 */
	basePrice?: number;

	/**
	 * Loại giảm giá của vé
	 */
	discountType?: ENUM_DISCOUNT_TYPE;

	/**
	 * Giá trị giảm giá của vé
	 */
	discountValue?: number;

	/**
	 * Giá sau giảm của vé
	 */
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
