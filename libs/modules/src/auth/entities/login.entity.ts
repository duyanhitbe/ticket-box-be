import { SwaggerProperty } from '@lib/common/decorators';

export abstract class LoginEntity {
	@SwaggerProperty()
	accessToken!: string;

	@SwaggerProperty()
	expiresIn!: number;
}
