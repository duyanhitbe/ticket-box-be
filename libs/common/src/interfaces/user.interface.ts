import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

export interface RequestUser {
	id: string;
	username?: string;
	phone?: string;
	role: ENUM_TOKEN_ROLE;
}
