import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketInfoDto } from './create-ticket-info.dto';
import { IsOptional } from 'class-validator';
import { I18nIsEnum, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export class UpdateTicketInfoDto extends PartialType(OmitType(CreateTicketInfoDto, ['quantity'])) {
	@IsOptional()
	@I18nIsEnum(ENUM_STATUS)
	@SwaggerProperty()
	@Property('Trạng thái')
	status?: ENUM_STATUS;
}
