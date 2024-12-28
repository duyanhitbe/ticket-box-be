import { Property } from '@lib/common/decorators/property.decorator';
import { SwaggerProperty } from '@lib/common/decorators/swagger.decorator';
import { IsOptional } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';
import { Where } from '@lib/base/types';
import { BaseEntity } from '@lib/base/entities';

export class BaseFilterDto<T extends BaseEntity = any> {
	@IsOptional()
	@SwaggerProperty({ required: false, type: 'string' })
	@Property('Item count per page')
	limit?: string | number;

	@IsOptional()
	@SwaggerProperty({ required: false, type: 'string' })
	@Property('Page number')
	page?: string | number;

	@IsOptional()
	@SwaggerProperty({ required: false })
	@Property('Search')
	search?: string;

	@ApiHideProperty()
	where?: Where<T>;

	@ApiHideProperty()
	searchFields?: string[];
}
