import {
	I18nIsArray,
	I18nIsDateString,
	I18nIsEnum,
	I18nIsNotEmpty,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import { Transform } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';

export class CreateTicketGroupDto {
	/**
	 * Mã sự kiện
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventId!: string;

	/**
	 * Tên nhóm vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tên nhóm vé')
	name!: string;

	/**
	 * Mô tả
	 */
	@IsOptional()
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty({ required: false })
	@Property('Mô tả')
	description?: string;

	/**
	 * Loại ngày diễn ra sự kiện
	 */
	@I18nIsEnum(ENUM_DATE_TYPE)
	@SwaggerProperty({
		enum: ENUM_DATE_TYPE,
		enumName: 'ENUM_DATE_TYPE'
	})
	@Property('Loại ngày diễn ra sự kiện')
	dateType!: ENUM_DATE_TYPE;

	/**
	 * Danh sách diễn ra sự kiện
	 */
	@Transform(({ obj, value }) => (obj.dateType === ENUM_DATE_TYPE.DURATION ? null : value))
	@ValidateIf((object: CreateTicketGroupDto) => object.dateType === ENUM_DATE_TYPE.FIXED)
	@I18nIsArray()
	@I18nIsDateString({ each: true })
	@SwaggerProperty({ type: [Date], required: false })
	@Property('Danh sách diễn ra sự kiện')
	dates?: Date[];

	/**
	 * Ngày bắt đầu sự kiện
	 */
	@Transform(({ obj, value }) => (obj.dateType === ENUM_DATE_TYPE.FIXED ? null : value))
	@ValidateIf((object: CreateTicketGroupDto) => object.dateType === ENUM_DATE_TYPE.DURATION)
	@I18nIsDateString()
	@SwaggerProperty({ required: false })
	@Property('Ngày bắt đầu sự kiện')
	fromDate?: Date;

	/**
	 * Ngày kết thúc sự kiện
	 */
	@Transform(({ obj, value }) => (obj.dateType === ENUM_DATE_TYPE.FIXED ? null : value))
	@ValidateIf((object: CreateTicketGroupDto) => object.dateType === ENUM_DATE_TYPE.DURATION)
	@I18nIsDateString()
	@SwaggerProperty({ required: false })
	@Property('Ngày kết thúc sự kiện')
	toDate?: Date;
}
