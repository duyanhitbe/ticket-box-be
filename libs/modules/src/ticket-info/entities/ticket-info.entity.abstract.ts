import { BaseEntity } from '@lib/base/entities';
import { EventEntity } from '@lib/modules/event';
import { TicketGroupEntity } from '@lib/modules/ticket-group';

export abstract class TicketInfoEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	eventId!: string;

	/**
	 * Mã nhóm vé
	 */
	ticketGroupId!: string;

	/**
	 * Tên vé
	 */
	name!: string;

	/**
	 * Số lượng vé
	 */
	quantity?: number;

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;

	/**
	 * Nhóm vé
	 */
	ticketGroup?: TicketGroupEntity;
}
