import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_PAYMENT_METHOD } from '@lib/modules/order/order.enum';

export class OrderCreatedEntity {
	/**
	 * Mã đơn háng
	 */
	@SwaggerProperty()
	@Property('Mã đơn háng')
	id!: string;

	/**
	 * Phương thức thanh toán
	 */
	@SwaggerProperty({
		enum: ENUM_PAYMENT_METHOD,
		enumName: 'ENUM_PAYMENT_METHOD'
	})
	@Property('Phương thức thanh toán')
	paymentMethod!: ENUM_PAYMENT_METHOD;
}
