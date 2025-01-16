import { BaseEntity } from '@lib/base/entities';
import { Property, SwaggerProperty } from '@lib/common/decorators';
import { AgencyLevelEntity } from '../../agency-level';
import { EventEntity } from '../../event';

export abstract class AgencyEntity extends BaseEntity {
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

	/* ========== Relations ========== */

	/**
	 * Cấp đại lý
	 */
	agencyLevel?: AgencyLevelEntity;

	/**
	 * Danh sách sự kiện
	 */
	events?: EventEntity[];
}
