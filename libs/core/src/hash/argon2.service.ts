import { HashService } from '@lib/core/hash/hash.service.abstract';
import { hash, verify } from 'argon2';

export class Argon2Service extends HashService {
	hash(password: string): Promise<string> {
		return hash(password);
	}

	verify(hashedPassword: string, password: string): Promise<boolean> {
		return verify(hashedPassword, password);
	}
}
