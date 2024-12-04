import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class TicketInfoByGroupEntity {
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
	@SwaggerProperty({ required: false })
	@Property('Số lượng vé')
	quantity?: number;

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
}