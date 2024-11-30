import { BaseEntity } from '@lib/base/entities';
import { ENUM_ORDER_STATUS, ENUM_PAYMENT_METHOD } from '@lib/modules/order/order.enum';
import { EventEntity } from '@lib/modules/event';
import { CustomerEntity } from '@lib/modules/customer';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class OrderEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Mã khách hàng
	 */
	@SwaggerProperty()
	@Property('Mã khách hàng')
	customerId!: string;

	/**
	 * Mã đơn hàng
	 */
	@SwaggerProperty()
	@Property('Mã đơn hàng')
	code!: string;

	/**
	 * Ghi chú
	 */
	@SwaggerProperty({ required: false })
	@Property('Ghi chú')
	note?: string;

	/**
	 * Tên sự kiện
	 */
	@SwaggerProperty()
	@Property('Tên sự kiện')
	eventName!: string;

	/**
	 * Tên khách hàng
	 */
	@SwaggerProperty()
	@Property('Tên khách hàng')
	customerName!: string;

	/**
	 * SĐT khách hàng
	 */
	@SwaggerProperty()
	@Property('SĐT khách hàng')
	customerPhone!: string;

	/**
	 * Email khách hàng
	 */
	@SwaggerProperty()
	@Property('Email khách hàng')
	customerEmail!: string;

	/**
	 * Phương thức thanh toán
	 */
	@SwaggerProperty({
		enum: ENUM_PAYMENT_METHOD,
		enumName: 'ENUM_PAYMENT_METHOD'
	})
	@Property('Phương thức thanh toán')
	paymentMethod!: ENUM_PAYMENT_METHOD;

	/**
	 * STK thanh toán
	 */
	@SwaggerProperty({ required: false })
	@Property('STK thanh toán')
	cardId?: string;

	/**
	 * Tên tài khoản thanh toán
	 */
	@SwaggerProperty({ required: false })
	@Property('Tên tài khoản thanh toán')
	cardName?: string;

	/**
	 * Tổng giá trị đơn hàng
	 */
	@SwaggerProperty()
	@Property('Tổng giá trị đơn hàng')
	totalPrice!: number;

	/**
	 * Trạng thái đơn hàng
	 */
	@SwaggerProperty({
		enum: ENUM_ORDER_STATUS,
		enumName: 'ENUM_ORDER_STATUS'
	})
	@Property('Trạng thái đơn hàng')
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
