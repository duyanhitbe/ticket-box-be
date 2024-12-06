import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

export type RequestUser = {
	id: string;
	username?: string;
	phone?: string;
	customerRoleId?: string;
	role: ENUM_TOKEN_ROLE;
} | null;
