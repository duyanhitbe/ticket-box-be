import { Injectable } from '@nestjs/common';
import { LoginDto, LoginEntity } from '@lib/modules/auth';
import {
	ACCESS_TOKEN_EXPIRES,
	ENUM_ADMIN_TOKEN_ROLE,
	ENUM_TOKEN_ROLE,
	JwtService
} from '@lib/core/jwt';
import { ExecuteHandler } from '@lib/common/abstracts';
import { CustomerRepository } from '@lib/modules/customer';
import { I18nExceptionService } from '@lib/core/i18n';
import { HashService } from '@lib/core/hash';
import { UserRepository } from '@lib/modules/user';

type User = {
	id: string;
	password: string;
};
type GetUser = Record<ENUM_ADMIN_TOKEN_ROLE, (usernameOrPhone: string) => Promise<User>>;

@Injectable()
export class LoginUseCase extends ExecuteHandler<LoginEntity> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JwtService,
		private readonly i18nExceptionService: I18nExceptionService,
		private readonly hashService: HashService
	) {
		super();
	}

	async execute(data: LoginDto): Promise<LoginEntity> {
		const { username, password, type } = data;

		const user = await this.getUserStrategy[type](username);

		const comparePassword = await this.hashService.verify(user.password, password);
		if (!comparePassword) {
			this.i18nExceptionService.throwWrongPassword();
		}

		const expiresIn = ACCESS_TOKEN_EXPIRES;
		const accessToken = await this.jwtService.sign(user.id, ENUM_TOKEN_ROLE.USER, expiresIn);

		return {
			accessToken,
			expiresIn
		};
	}

	private get getUserStrategy(): GetUser {
		return {
			[ENUM_ADMIN_TOKEN_ROLE.USER]: (username) => this.findUser(username),
			[ENUM_ADMIN_TOKEN_ROLE.AGENCY]: (phone) => this.findAgency(phone)
		};
	}

	private async findUser(username: string): Promise<User> {
		return this.userRepository.findOneOrThrow({
			where: { username },
			select: ['id', 'password']
		});
	}

	private async findAgency(phone: string): Promise<User> {
		return this.customerRepository.findAgencyByPhone(phone);
	}
}
