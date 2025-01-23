import { Property, SwaggerProperty } from '@lib/common/decorators';
import { BaseEntity } from '@lib/base/entities';

export class ListAgencyEntity extends BaseEntity {
	/**
	 * Tên đại lý
	 */
	@SwaggerProperty()
	@Property('Tên đại lý')
	name!: string;

	/**
	 * Số điện thoại đại lý
	 */
	@SwaggerProperty({ required: false })
	@Property('Số điện thoại đại lý')
	phone?: string;

	/**
	 * Địa chỉ đại lý
	 */
	@SwaggerProperty({ required: false })
	@Property('Địa chỉ đại lý')
	address?: string;

	/**
	 * Mã cấp đại lý
	 */
	@SwaggerProperty()
	@Property('Mã cấp đại lý')
	agencyLevelId!: string;

	/**
	 * Tên cấp đại lý
	 */
	@SwaggerProperty()
	@Property('Tên cấp đại lý')
	agencyLevelName!: string;

	/**
	 * Cấp đại lý
	 */
	@SwaggerProperty()
	@Property('Cấp đại lý')
	agencyLevel!: number;
}
