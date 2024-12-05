import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketInfoByGroupDto {
	/**
	 * Mã nhóm vé
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã nhóm vé')
	ticketGroupId!: string;
}
