import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_ORDER_STATUS } from '../order.enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderUpdatedEntity {
	@ApiProperty()
	id!: string;

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
}
