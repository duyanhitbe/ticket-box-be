import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationGuard, PUBLIC_METADATA_KEY } from '@lib/core/guards';

export function UseAuth(isPublic = false) {
	return applyDecorators(
		ApiBearerAuth(),
		SetMetadata(PUBLIC_METADATA_KEY, isPublic),
		UseGuards(AuthenticationGuard)
	);
}
