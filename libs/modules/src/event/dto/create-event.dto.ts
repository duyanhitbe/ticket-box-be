import {
	I18nIsBoolean,
	I18nIsEnum,
	I18nIsNotEmpty,
	I18nIsNumber,
	I18nIsString,
	I18nIsUrl,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ENUM_EVENT_TYPE } from '../event.enum';
import { IsOptional } from 'class-validator';

export class CreateEventDto {
	/**
	 * Tên sự kiện
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tên sự kiện')
	name!: string;

	/**
	 * Loại sự kiện
	 */
	@I18nIsEnum(ENUM_EVENT_TYPE)
	@SwaggerProperty({
		enum: ENUM_EVENT_TYPE,
		enumName: 'ENUM_EVENT_TYPE'
	})
	@Property('Loại sự kiện')
	eventType!: ENUM_EVENT_TYPE;

	/**
	 * Hình ảnh
	 */
	@I18nIsUrl()
	@SwaggerProperty()
	@Property('Hình ảnh')
	image!: string;

	/**
	 * Hình thumbnail
	 */
	@I18nIsUrl()
	@SwaggerProperty()
	@Property('Hình thumbnail')
	thumbnail!: string;

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
	 * Giá hiển thị
	 */
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Giá hiển thị')
	displayPrice!: number;

	/**
	 * Sử dụng làm banner
	 */
	@IsOptional()
	@I18nIsBoolean()
	@SwaggerProperty()
	@Property('Sử dụng làm banner')
	isBanner!: boolean;

	/**
	 * Thứ tự khi được sử dụng làm banner
	 */
	@IsOptional()
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Thứ tự khi được sử dụng làm banner')
	order!: number;

	/**
	 * Địa điểm
	 */
	@IsOptional()
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty({ required: false })
	@Property('Địa điểm')
	location?: string;
}
