import { BaseEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { EventEntity } from '@lib/modules/event';
import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { CustomerRoleEntity } from '@lib/modules/customer-role';
import { TicketGroupEntity } from '@lib/modules/ticket-group';

export abstract class TicketPriceEntity extends BaseEntity {
	/**
	 * Mã thông tin vé
	 */
	ticketInfoId!: string;

	/**
	 * Mã nhóm quyền
	 */
	customerRoleId!: string;

	/**
	 * Mã sự kiện
	 */
	eventId!: string;

	/**
	 * Mã nhóm vé
	 */
	ticketGroupId!: string;

	/**
	 * Giá gốc
	 */
	basePrice!: number;

	/**
	 * Loại giảm giá
	 */
	discountType!: ENUM_DISCOUNT_TYPE;

	/**
	 * Giá trị giảm
	 */
	discountValue!: number;

	/**
	 * Giá sau giảm
	 */
	discountedPrice!: number;

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
