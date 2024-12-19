import { BaseEntity } from '@lib/base/entities';
import { EventEntity } from '@lib/modules/event';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class TicketInfoEntity extends BaseEntity {
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
	 * Mã vé
	 */
	@SwaggerProperty()
	@Property('Mã vé')
	code!: string;

	/**
	 * Thứ tự hiển thị
	 */
	@SwaggerProperty()
	@Property('Thứ tự hiển thị')
	order!: number;

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
