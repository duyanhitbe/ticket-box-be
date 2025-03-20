import {
	I18nIsNotEmpty,
	I18nIsNumber,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class CreateNewsDto {
	/**
	 * Tiêu đề
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tiêu đề')
	title!: string;

	/**
	 * Thumbnail
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Thumbnail')
	thumbnail!: string;

	/**
	 * Nội dung
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Nội dung')
	content!: string;

	/**
	 * Thứ tự hiển thị
	 */
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Thứ tự hiển thị')
	order!: number;

	/**
	 * Slug
	 */
	@IsOptional()
	@I18nIsString()
	@SwaggerProperty({ nullable: true })
	@Property('Slug')
	slug?: string;
}
