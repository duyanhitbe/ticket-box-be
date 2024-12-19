import {
	I18nIsNotEmpty,
	I18nIsNumber,
	I18nIsString,
	I18nIsUUID,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class CreateTicketInfoDto {
	/**
	 * Mã nhóm vé
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;

	/**
	 * Tên vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tên vé')
	name!: string;

	/**
	 * Số lượng vé
	 */
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Số lượng vé')
	quantity!: number;

	/**
	 * Giá vé
	 */
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Giá vé')
	price!: number;

	/**
	 * Thứ tự hiển thị
	 */
	@IsOptional()
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Thứ tự hiển thị')
	order?: number;
}
