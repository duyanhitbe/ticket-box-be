import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class FilterTicketInfoDto extends BaseFilterDto {
	/**
	 * Mã nhóm vé
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã nhóm vé')
	ticketGroupId?: string;
}
