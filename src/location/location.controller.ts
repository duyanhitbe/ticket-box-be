import { Controller, Get } from '@nestjs/common';
import { LocationEntity, PROVINCES } from '@lib/modules/location';
import { SwaggerListResponse } from '@lib/common/decorators';

@Controller('locations')
export class LocationController {
	/**
	 * @path /api/v1/locations
	 */
	@SwaggerListResponse({ summary: 'Get list locations', type: LocationEntity, paginated: false })
	@Get()
	find() {
		return PROVINCES;
	}
}
