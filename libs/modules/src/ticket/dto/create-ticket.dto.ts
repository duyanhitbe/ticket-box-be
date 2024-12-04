import {
	I18nIsNotEmpty,
	I18nIsNumber,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';

export class CreateTicketDto {
	/**
	 * Mã thông tin vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	ticketInfoId!: string;

	/**
	 * Mã thông tin vé
	 */
	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	quantity!: number;
}
