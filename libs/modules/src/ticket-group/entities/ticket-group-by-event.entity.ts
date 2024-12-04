import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class TicketGroupByEventEntity {
	/**
	 * Mã nhóm vé
	 */
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	id!: string;

	/**
	 * Tên nhóm vé
	 */
	@SwaggerProperty()
	@Property('Tên nhóm vé')
	name!: string;

	/**
	 * Mô tả
	 */
	@SwaggerProperty({ required: false })
	@Property('Mô tả')
	description?: string;
}
