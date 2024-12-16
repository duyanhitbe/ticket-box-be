import { BaseFilterDto } from '@lib/base/dto';
import { IsOptional } from 'class-validator';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export class FilterUserDto extends BaseFilterDto {
	@IsOptional()
	@SwaggerProperty()
	@Property('Tài khoản')
	username?: string;
}
