import { BaseEntity } from '@lib/base/entities';
import { ENUM_ORDER_STATUS, ENUM_PAYMENT_METHOD } from '@lib/modules/order';
import { EventEntity } from '@lib/modules/event';
import { CustomerEntity } from '@lib/modules/customer';

export abstract class OrderEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	eventId!: string;

	/**
	 * Mã khách hàng
	 */
	customerId!: string;

	/**
	 * Mã đơn hàng
	 */
	code!: string;

	/**
	 * Ghi chú
	 */
	note?: string;

	/**
	 * Tên sự kiện
	 */
	eventName!: string;

	/**
	 * Tên khách hàng
	 */
	customerName!: string;

	/**
	 * SĐT khách hàng
	 */
	customerPhone!: string;

	/**
	 * Email khách hàng
	 */
	customerEmail!: string;

	/**
	 * Phương thức thanh toán
	 */
	paymentMethod!: ENUM_PAYMENT_METHOD;

	/**
	 * STK thanh toán
	 */
	cardId?: string;

	/**
	 * Tên tài khoản thanh toán
	 */
	cardName?: string;

	/**
	 * Tổng giá trị đơn hàng
	 */
	totalPrice!: number;

	/**
	 * Trạng thái đơn hàng
	 */
	orderStatus!: ENUM_ORDER_STATUS;

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;

	/**
	 * Khách hàng
	 */
	customer?: CustomerEntity;
}
