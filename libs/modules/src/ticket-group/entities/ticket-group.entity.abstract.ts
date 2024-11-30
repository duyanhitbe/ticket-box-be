import { BaseEntity } from '@lib/base/entities';
import { EventEntity } from '@lib/modules/event';

export abstract class TicketGroupEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	eventId!: string;

	/**
	 * Tên nhóm vé
	 */
	name!: string;

	/**
	 * Mô tả
	 */
	description?: string;

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;
}
