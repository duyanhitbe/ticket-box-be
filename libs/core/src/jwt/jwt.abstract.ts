import { JwtPayload } from '@lib/core/jwt/jwt.type';

export abstract class JwtService {
	abstract sign(sub: string, expiresIn: number): Promise<string>;

	abstract verify(token: string): Promise<JwtPayload>;

	abstract decode(token: string): Promise<JwtPayload>;
}
