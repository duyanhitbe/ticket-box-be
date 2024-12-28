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
	 * Thứ tự vé
	 */
	@SwaggerProperty()
	@Property('Thứ tự vé')
	order!: number;
}
