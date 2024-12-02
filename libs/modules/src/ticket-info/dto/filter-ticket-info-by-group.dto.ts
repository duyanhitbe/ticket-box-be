import { I18nIsNotEmpty, I18nIsString, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketInfoByGroupDto {
	/**
	 * Mã nhóm vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;
}
