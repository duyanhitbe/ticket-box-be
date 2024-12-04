import { I18nIsNotEmpty, I18nIsString, Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateCustomerRoleDto {
	/**
	 * Tên nhóm quyền
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Tên nhóm quyền')
	name!: string;

	/**
	 * Mã nhóm quyền
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty()
	@Property('Mã nhóm quyền')
	code!: string;
}
