import { I18nIsNumber, I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateTicketDto {
	/**
	 * Mã thông tin vé
	 */
	@I18nIsUUID()
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

	skipUpdateTicketInfo?: boolean;
}
