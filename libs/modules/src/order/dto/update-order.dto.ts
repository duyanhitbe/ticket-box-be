import { I18nIsEnum, I18nIsString, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_ORDER_STATUS } from '../order.enum';
import { IsOptional, ValidateIf } from 'class-validator';

export class UpdateOrderDto {
	/**
	 * Trạng thái đơn hàng
	 */
	@IsOptional()
	@I18nIsEnum(ENUM_ORDER_STATUS)
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
	@ValidateIf((ojb: UpdateOrderDto) => ojb.orderStatus === ENUM_ORDER_STATUS.CANCELLED)
	@I18nIsString()
	@SwaggerProperty()
	@Property('Lí do')
	reason?: string;
}
