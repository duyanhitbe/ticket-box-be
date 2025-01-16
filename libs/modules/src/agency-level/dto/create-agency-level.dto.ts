import { I18nIsNumber, I18nIsString, Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateAgencyLevelDto {
	@I18nIsString()
	@SwaggerProperty()
	@Property('Tên cấp đại lý')
	name!: string;

	@I18nIsNumber()
	@SwaggerProperty()
	@Property('Cấp độ đại lý')
	level!: number;
}
