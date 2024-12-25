import { Property, SwaggerProperty } from '@lib/common/decorators';

export class LocationEntity {
	@SwaggerProperty()
	@Property('Mã địa điểm')
	id!: string;

	@SwaggerProperty()
	@Property('Tên địa điểm')
	name!: string;
}
