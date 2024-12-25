import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketPriceDto } from './create-ticket-price.dto';
import { IsOptional } from 'class-validator';
import { I18nIsEnum, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export class UpdateTicketPriceDto extends PartialType(
	OmitType(CreateTicketPriceDto, ['ticketInfoId', 'customerRoleId'])
) {
	@IsOptional()
	@I18nIsEnum(ENUM_STATUS)
	@SwaggerProperty()
	@Property('Trạng thái')
	status?: ENUM_STATUS;
}
