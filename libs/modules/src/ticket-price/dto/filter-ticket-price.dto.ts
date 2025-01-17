import { BaseFilterDto } from '@lib/base/dto';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';
import { IsOptional } from 'class-validator';
import { TicketPriceEntity } from '@lib/modules/ticket-price';

export class FilterTicketPriceDto extends BaseFilterDto<TicketPriceEntity> {
	/**
	 * Mã sự kiện
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId?: string;

	/**
	 * Mã nhóm vé
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã nhóm vé')
	ticketGroupId?: string;

	/**
	 * Mã thông tin vé
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã thông tin vé')
	ticketInfoId?: string;

	/**
	 * Mã cấp đại lý
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã cấp đại lý')
	agencyLevelId?: string;
}
