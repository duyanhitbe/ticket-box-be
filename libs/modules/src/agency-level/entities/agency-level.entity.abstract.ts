import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export abstract class AgencyLevelEntity extends BaseEntity {
	@SwaggerProperty()
	@Property('Tên cấp đại lý')
	name!: string;

	@SwaggerProperty()
	@Property('Cấp độ đại lý')
	level!: number;
}
