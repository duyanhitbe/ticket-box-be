import {
	I18nIsEnum,
	I18nIsNotEmpty,
	I18nIsNumber,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { IsOptional, ValidateIf } from 'class-validator';

export class CreateTicketPriceDto {
	/**
	 * Mã thông tin vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	ticketInfoId!: string;

	/**
	 * Mã nhóm quyền
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mã nhóm quyền')
	customerRoleId!: string;

	/**
	 * Giá gốc
	 */
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Giá gốc')
	basePrice!: number;

	/**
	 * Loại giảm giá
	 */
	@IsOptional()
	@I18nIsEnum(ENUM_DISCOUNT_TYPE)
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
	@ValidateIf((obj: CreateTicketPriceDto) => Boolean(obj.discountType))
	@I18nIsNumber()
	@SwaggerProperty({ required: false })
	@Property('Giá trị giảm')
	discountValue?: number;
}
