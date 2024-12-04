import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { EventEntity } from '@lib/modules/event';
import { TicketGroupEntity } from '@lib/modules/ticket-group';

export abstract class TicketGroupDateEntity extends BaseEntity {
	/**
	 * Mã sự kiện
	 */
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Mã nhóm vé
	 */
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;

	/**
	 * Ngày diễn ra sự kiện
	 */
	@SwaggerProperty()
	@Property('Ngày diễn ra sự kiện')
	date!: Date;

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
