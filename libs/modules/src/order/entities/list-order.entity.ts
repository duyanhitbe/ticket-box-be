import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_ORDER_STATUS, ENUM_PAYMENT_METHOD } from '@lib/modules/order';

export class ListOrderEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId?: string;

	/**
	 * Mã khách hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('Mã khách hàng')
	customerId?: string;

	/**
	 * Mã đơn hàng
	 */
	@SwaggerProperty()
	@Property('Mã đơn hàng')
	code!: string;

	/**
	 * Tên sự kiện
	 */
	@SwaggerProperty({ required: false })
	@Property('Tên sự kiện')
	eventName?: string;

	/**
	 * Tên khách hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('Tên khách hàng')
	customerName?: string;

	/**
	 * SĐT khách hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('SĐT khách hàng')
	customerPhone?: string;

	/**
	 * Email khách hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('Email khách hàng')
	customerEmail?: string;

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
	 * Tổng giá trị đơn hàng
	 */
	@SwaggerProperty({ required: false })
	@Property('Tổng giá trị đơn hàng')
	totalPrice?: number;

	/**
	 * Trạng thái đơn hàng
	 */
	@SwaggerProperty({
		enum: ENUM_ORDER_STATUS,
		enumName: 'ENUM_ORDER_STATUS',
		required: false
	})
	@Property('Trạng thái đơn hàng')
	orderStatus?: ENUM_ORDER_STATUS;

	/**
	 * Lí do
	 */
	@SwaggerProperty()
	@Property('Lí do')
	reason?: string;
}
