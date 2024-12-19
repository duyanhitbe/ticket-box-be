import { Property, SwaggerProperty } from '@lib/common/decorators';
import { TicketInfoByGroupEntity } from '@lib/modules/ticket-info';

export class TicketGroupByEventEntity {
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

	/**
	 * Vé
	 */
	@SwaggerProperty()
	@Property('Vé')
	ticketInfos!: TicketInfoByGroupEntity[];
}

export class RawTicketGroupByEventEntity {
	/**
	 * Mã nhóm vé
	 */
	id!: string;

	/**
	 * Tên nhóm vé
	 */
	name!: string;

	/**
	 * Mô tả
	 */
	description?: string;

	/**
	 * Mã thông tin vé
	 */
	ticketInfoId?: string;
	/**
	 * Tên thông tin vé
	 */
	ticketInfoName?: string;

	/**
	 * Số lượng vé
	 */
	ticketInfoQuantity?: number;

	/**
	 * Giá vé
	 */
	ticketInfoBasePrice?: number;

	/**
	 * Giá vé sau giảm
	 */
	ticketInfoDiscountedPrice?: number;
}
