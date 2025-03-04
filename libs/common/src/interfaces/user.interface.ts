import { ENUM_TOKEN_ROLE } from '@lib/core/jwt';

export type RequestUser = {
	id: string;
	username?: string;
	phone?: string;
	agencyLevelId?: string;
	role: ENUM_TOKEN_ROLE;
	eventIds?: string[];
	agencyId?: string;
} | null;
