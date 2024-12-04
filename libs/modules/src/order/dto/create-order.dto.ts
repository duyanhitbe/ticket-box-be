import {
	I18nIsEmail,
	I18nIsEnum,
	I18nIsNotEmpty,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ENUM_PAYMENT_METHOD } from '@lib/modules/order/order.enum';
import { IsOptional, ValidateIf } from 'class-validator';

export class CreateOrderDto {
	/**
	 * Ghi chú
	 */
	@IsOptional()
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty({ required: false })
	@Property('Ghi chú')
	note?: string;

	/**
	 * Tên khách hàng
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tên khách hàng')
	customerName!: string;

	/**
	 * SĐT khách hàng
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('SĐT khách hàng')
	customerPhone!: string;

	/**
	 * Email khách hàng
	 */
	@I18nIsEmail()
	@SwaggerProperty()
	@Property('Email khách hàng')
	customerEmail!: string;

	/**
	 * Phương thức thanh toán
	 */
	@I18nIsEnum(ENUM_PAYMENT_METHOD)
	@SwaggerProperty({
		enum: ENUM_PAYMENT_METHOD,
		enumName: 'ENUM_PAYMENT_METHOD'
	})
	@Property('Phương thức thanh toán')
	paymentMethod!: ENUM_PAYMENT_METHOD;

	/**
	 * STK thanh toán
	 */
	@ValidateIf((obj: CreateOrderDto) => obj.paymentMethod === ENUM_PAYMENT_METHOD.BANKING)
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty({ required: false })
	@Property('STK thanh toán')
	cardId?: string;

	/**
	 * Tên tài khoản thanh toán
	 */
	@ValidateIf((obj: CreateOrderDto) => obj.paymentMethod === ENUM_PAYMENT_METHOD.BANKING)
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty({ required: false })
	@Property('Tên tài khoản thanh toán')
	cardName?: string;
}
