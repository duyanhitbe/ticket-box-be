import { BaseEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { EventEntity } from '@lib/modules/event';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { AgencyLevelEntity } from '../../agency-level';

export abstract class TicketPriceEntity extends BaseEntity {
	/**
	 * Mã thông tin vé
	 */
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	ticketInfoId!: string;

	/**
	 * Mã cấp đại lý
	 */
	@SwaggerProperty()
	@Property('Mã cấp đại lý')
	agencyLevelId!: string;

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
	 * Giá gốc
	 */
	@SwaggerProperty()
	@Property('Giá gốc')
	basePrice!: number;

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
	 * Giá sau giảm
	 */
	@SwaggerProperty()
	@Property('Giá sau giảm')
	discountedPrice!: number;

	/* ========== Relations ========== */

	/**
	 * Sự kiện
	 */
	event?: EventEntity;

	/**
	 * Thông tin vé
	 */
	ticketInfo?: TicketInfoEntity;

	/**
	 * Nhóm vé
	 */
	ticketGroup?: TicketGroupEntity;

	/**
	 * Cấp đại lý
	 */
	agencyLevel?: AgencyLevelEntity;
}
