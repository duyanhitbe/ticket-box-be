import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsEnum, I18nIsUUID } from '@lib/common/decorators/i18n.decorator';
import { Property } from '@lib/common/decorators/property.decorator';
import { SwaggerProperty } from '@lib/common/decorators/swagger.decorator';
import { ENUM_ORDER_STATUS, ENUM_PAYMENT_METHOD } from '../order.enum';
import { IsOptional } from 'class-validator';

export class FilterOrderDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `code`, `customerName`, `customerPhone`, `customerEmail`')
	search?: string;

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
	 * Phương thức thanh toán
	 */
	@IsOptional()
	@I18nIsEnum(ENUM_PAYMENT_METHOD)
	@SwaggerProperty({
		enum: ENUM_PAYMENT_METHOD,
		enumName: 'ENUM_PAYMENT_METHOD',
		required: false
	})
	@Property('Phương thức thanh toán')
	paymentMethod?: ENUM_PAYMENT_METHOD;

	/**
	 * Mã sự kiện
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId?: string;

	/**
	 * Mã khách hàng
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã khách hàng')
	customerId?: string;
}
