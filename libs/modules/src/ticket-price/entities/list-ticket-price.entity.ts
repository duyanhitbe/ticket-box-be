import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ApiHideProperty } from '@nestjs/swagger';
import { ENUM_DISCOUNT_TYPE } from '../../common';
import { TicketPriceEntity } from './ticket-price.entity.abstract';

export class ListTicketPriceEntity extends BaseEntity implements TicketPriceEntity {
	@SwaggerProperty()
	@Property('Tên sự kiện')
	eventName!: string;

	@SwaggerProperty()
	@Property('Tên nhóm vé')
	ticketGroupName!: string;

	@SwaggerProperty()
	@Property('Tên vé')
	ticketInfoName!: string;

	@ApiHideProperty()
	ticketInfoId!: string;

	@ApiHideProperty()
	agencyLevelId!: string;

	@ApiHideProperty()
	eventId!: string;

	@ApiHideProperty()
	ticketGroupId!: string;

	@SwaggerProperty()
	@Property('Giá gốc')
	basePrice!: number;

	@SwaggerProperty({
		enum: ENUM_DISCOUNT_TYPE,
		enumName: 'ENUM_DISCOUNT_TYPE',
		required: false
	})
	@Property('Loại giảm giá')
	discountType?: ENUM_DISCOUNT_TYPE;

	@SwaggerProperty({ required: false })
	@Property('Giá trị giảm')
	discountValue?: number;

	@SwaggerProperty()
	@Property('Giá sau giảm')
	discountedPrice!: number;
}
