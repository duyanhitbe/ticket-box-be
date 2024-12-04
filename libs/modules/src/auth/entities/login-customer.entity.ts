import { SwaggerProperty } from '@lib/common/decorators';

export abstract class LoginCustomerEntity {
	@SwaggerProperty()
	accessToken!: string;

	@SwaggerProperty()
	expiresIn!: number;
}
