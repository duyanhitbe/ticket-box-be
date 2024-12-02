import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterTicketGroupDateDto extends BaseFilterDto {
	/**
	 * Mã sự kiện
	 */
	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Mã sự kiện')
	eventId?: string;
}
