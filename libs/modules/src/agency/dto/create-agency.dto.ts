import {
	I18nIsArray,
	I18nIsString,
	I18nIsUUID,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { IsOptional } from 'class-validator';

export class CreateAgencyDto {
	@I18nIsString()
	@SwaggerProperty()
	@Property('Tên đại lý')
	name!: string;

	@IsOptional()
	@I18nIsString()
	@SwaggerProperty({ required: false })
	@Property('Số điện thoại đại lý')
	phone?: string;

	@IsOptional()
	@I18nIsString()
	@SwaggerProperty({ required: false })
	@Property('Địa chỉ đại lý')
	address?: string;

	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã cấp đại lý')
	agencyLevelId!: string;

	@I18nIsArray()
	@SwaggerProperty()
	@Property('Mã sự kiện')
	eventIds!: string[];
}
