import { CreateCustomerDto } from '../../customer';
import { I18nIsUUID, Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateAgencyUserDto extends CreateCustomerDto {
	/**
	 * Mã đại lý
	 */
	@I18nIsUUID()
	@SwaggerProperty()
	@Property('Mã đại lý')
	agencyId!: string;
}
