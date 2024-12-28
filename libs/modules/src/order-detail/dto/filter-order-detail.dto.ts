import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';
import { OrderDetailEntity } from '@lib/modules/order-detail';

export class FilterOrderDetailDto extends BaseFilterDto<OrderDetailEntity> {
	/**
	 * Mã đơn hàng
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã đơn hàng')
	orderId?: string;
}
