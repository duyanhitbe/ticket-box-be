import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationUserGuard } from '@lib/core/guards';

export function UseUserAuth() {
	return applyDecorators(ApiBearerAuth(), UseGuards(AuthenticationUserGuard));
}
