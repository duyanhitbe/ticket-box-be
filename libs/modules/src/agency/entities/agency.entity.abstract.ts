import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { AgencyLevelEntity } from '../../agency-level';

export abstract class AgencyEntity extends BaseEntity {
	@SwaggerProperty()
	@Property('Tên đại lý')
	name!: string;

	@SwaggerProperty({ required: false })
	@Property('Số điện thoại đại lý')
	phone?: string;

	@SwaggerProperty({ required: false })
	@Property('Địa chỉ đại lý')
	address?: string;

	@SwaggerProperty()
	@Property('Mã cấp đại lý')
	agencyLevelId!: string;

	agencyLevel?: AgencyLevelEntity;
}
