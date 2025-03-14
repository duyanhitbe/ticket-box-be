import { PartialType } from '@nestjs/swagger';
import { CreateAgencyLevelDto } from './create-agency-level.dto';
import { IsOptional } from 'class-validator';
import { I18nIsEnum, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export class UpdateAgencyLevelDto extends PartialType(CreateAgencyLevelDto) {
	@IsOptional()
	@I18nIsEnum(ENUM_STATUS)
	@SwaggerProperty()
	@Property('Trạng thái')
	status?: ENUM_STATUS;
}
