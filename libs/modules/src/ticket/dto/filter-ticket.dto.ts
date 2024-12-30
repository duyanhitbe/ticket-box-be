import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search by `code`')
	search?: string;

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
	 * Mã khách hàng
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã khách hàng')
	customerId?: string;

	/**
	 * Mã đơn hàng
	 */
	@IsOptional()
	@I18nIsUUID()
	@SwaggerProperty({ required: false })
	@Property('Mã đơn hàng')
	orderId?: string;
}
