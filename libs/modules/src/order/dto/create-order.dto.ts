import {
	I18nIsArray,
	I18nIsDateString,
	I18nIsEmail,
	I18nIsEnum,
	I18nIsNotEmpty,
	I18nIsString,
	I18nIsVNPhoneNumber,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ENUM_PAYMENT_METHOD } from '../order.enum';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateOrderDetailDto } from '@lib/modules/order-detail';
import { Type } from 'class-transformer';

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
	@I18nIsVNPhoneNumber()
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
	 * Chi tiết đơn hàng
	 */
	@ValidateNested({ each: true })
	@Type(() => CreateOrderDetailDto)
	@I18nIsArray()
	@SwaggerProperty({ type: [CreateOrderDetailDto] })
	@Property('Chi tiết đơn hàng')
	details!: CreateOrderDetailDto[];

	/**
	 * Ngày đặt vé
	 */
	@SwaggerProperty()
	@I18nIsDateString()
	@Property('Ngày đặt vé')
	date!: Date;
}
