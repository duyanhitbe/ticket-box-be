import {
	I18nIsNotEmpty,
	I18nIsNumber,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class CreateTicketInfoDto {
	/**
	 * Mã nhóm vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
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
	@IsOptional()
	@I18nIsNumber()
	@SwaggerProperty({ required: false })
	@Property('Số lượng vé')
	quantity?: number;
}
