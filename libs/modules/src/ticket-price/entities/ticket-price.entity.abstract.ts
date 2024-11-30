import { BaseEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { EventEntity } from '@lib/modules/event';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { CustomerRoleEntity } from '@lib/modules/customer-role';
import { TicketGroupEntity } from '@lib/modules/ticket-group';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class TicketPriceEntity extends BaseEntity {
	/**
	 * Mã thông tin vé
	 */
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	ticketInfoId!: string;

	/**
	 * Mã nhóm quyền
	 */
	@SwaggerProperty()
	@Property('Mã nhóm quyền')
	customerRoleId!: string;

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
	 * Nhóm quyền
	 */
	customerRole?: CustomerRoleEntity;

	/**
	 * Nhóm vé
	 */
	ticketGroup?: TicketGroupEntity;
}
