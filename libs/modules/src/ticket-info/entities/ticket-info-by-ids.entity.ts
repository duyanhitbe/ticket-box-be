import { Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';

export abstract class TicketInfoByIdsEntity {
	/**
	 * Mã thông tin vé
	 */
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	id!: string;

	/**
	 * Tên vé
	 */
	@SwaggerProperty()
	@Property('Tên vé')
	name!: string;

	/**
	 * Số lượng vé
	 */
	@SwaggerProperty()
	@Property('Số lượng vé')
	quantity!: number;

	/**
	 * Giá gốc
	 */
	@SwaggerProperty()
	@Property('Giá gốc')
	basePrice!: number;

	/**
	 * Giá sau giảm
	 */
	@SwaggerProperty()
	@Property('Giá sau giảm')
	discountedPrice!: number;

	/**
	 * Loại giảm giá
	 */
	@SwaggerProperty({
		enum: ENUM_DISCOUNT_TYPE,
		enumName: 'ENUM_DISCOUNT_TYPE',
		required: false
	})
	@Property('Loại giảm giá')
	discountType?: ENUM_DISCOUNT_TYPE;

	/**
	 * Giá trị giảm
	 */
	@SwaggerProperty({ required: false })
	@Property('Giá trị giảm')
	discountValue?: number;

	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Tên sự kiện
	 */
	@SwaggerProperty()
	@Property('Tên sự kiện')
	eventName!: string;

	/**
	 * Mã nhóm vé
	 */
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;
}
