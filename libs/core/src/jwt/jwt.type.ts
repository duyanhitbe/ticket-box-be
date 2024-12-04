import { ENUM_TOKEN_ROLE } from '@lib/core/jwt/jwt.enum';

export type JwtPayload = {
	sub: string;
	iat: number;
	exp: number;
	role: ENUM_TOKEN_ROLE;
};
