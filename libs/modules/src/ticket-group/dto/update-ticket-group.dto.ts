import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketGroupDto } from './create-ticket-group.dto';
import { IsOptional } from 'class-validator';
import { I18nIsEnum, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export class UpdateTicketGroupDto extends PartialType(OmitType(CreateTicketGroupDto, ['eventId'])) {
	@IsOptional()
	@I18nIsEnum(ENUM_STATUS)
	@SwaggerProperty()
	@Property('Trạng thái')
	status?: ENUM_STATUS;
}
