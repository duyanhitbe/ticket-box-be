import { BaseEntity } from '@lib/base/entities';
import { EventEntity } from '@lib/modules/event';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class TicketGroupEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

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

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;
}
