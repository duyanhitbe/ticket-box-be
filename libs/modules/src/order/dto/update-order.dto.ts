import { I18nIsEnum, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_ORDER_STATUS } from '../order.enum';
import { IsOptional } from 'class-validator';

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
}
