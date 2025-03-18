import { PartialType } from '@nestjs/swagger';
import { CreateNewsDto } from './create-news.dto';
import { IsOptional } from 'class-validator';
import { I18nIsEnum, Property, SwaggerProperty } from '@lib/common/decorators';
import { ENUM_STATUS } from '@lib/base/enums/status.enum';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
	@IsOptional()
	@I18nIsEnum(ENUM_STATUS)
	@SwaggerProperty()
	@Property('Trạng thái')
	status?: ENUM_STATUS;
}
