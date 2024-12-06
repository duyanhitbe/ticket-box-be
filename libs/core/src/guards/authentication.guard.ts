import {
	CanActivate,
	ExecutionContext,
	forwardRef,
	Inject,
	Injectable,
	Logger
} from '@nestjs/common';
import { ENUM_TOKEN_ROLE, JwtService } from '@lib/core/jwt';
import { I18nExceptionService } from '@lib/core/i18n';
import { UserEntity, UserRepository } from '@lib/modules/user';
import { RequestUser } from '@lib/common/interfaces';
import { CustomerEntity, CustomerRepository } from '@lib/modules/customer';
import { Reflector } from '@nestjs/core';
import { REDIS_PREFIX_KEY, RedisService } from '@lib/core/redis';

export const PUBLIC_METADATA_KEY = 'PUBLIC_METADATA_KEY';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		@Inject(forwardRef(() => UserRepository))
		private readonly userRepository: UserRepository,
		private readonly customerRepository: CustomerRepository,
		private readonly jwtService: JwtService,
		private readonly i18nExceptionService: I18nExceptionService,
		private readonly reflector: Reflector,
		private readonly redisService: RedisService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const accessToken = request.headers.authorization?.split(' ')[1];

		const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_METADATA_KEY, [
			context.getClass(),
			context.getHandler()
		]);

		if (!accessToken && !isPublic) {
			this.logger.error('Missing authorization header');
			this.i18nExceptionService.throwMissingAuthorization();
		}

		if (accessToken) {
			const start = performance.now();
			console.log();
			this.logger.log('Authenticating incoming user');
			let userId = '';
			let role: ENUM_TOKEN_ROLE | null = null;

			try {
				const payload = await this.jwtService.verify(accessToken);
				userId = payload.sub;
				role = payload.role;
			} catch (err) {
				this.logger.error('Invalid access token');
				this.logger.error(err.message);
				this.i18nExceptionService.throwInvalidAuthorization();
			}

			if (userId === '' || !role) this.i18nExceptionService.throwInvalidAuthorization();

			request['user'] = await this.getUserByRole(userId, role);
			const end = performance.now();
			const duration = (end - start).toFixed();
			this.logger.log(`Authenticated incoming user took ${duration}ms`);
		}

		return true;
	}

	private async getUserByRole(userId: string, role: ENUM_TOKEN_ROLE): Promise<RequestUser> {
		const cachedUser = await this.redisService.get<RequestUser>({
			prefix: REDIS_PREFIX_KEY.AUTHENTICATION.REQUEST_USER,
			key: userId
		});
		if (cachedUser) return cachedUser;

		switch (role) {
			case ENUM_TOKEN_ROLE.USER:
				const user = await this.userRepository.findById({
					id: userId,
					select: ['id', 'username']
				});
				if (!user) this.i18nExceptionService.throwNotFoundEntity(UserEntity.name);
				const resultUser = { id: user.id, username: user.username, role: role };
				await this.redisService.setNx({
					prefix: REDIS_PREFIX_KEY.AUTHENTICATION.REQUEST_USER,
					key: userId,
					value: resultUser
				});
				return resultUser;
			case ENUM_TOKEN_ROLE.CUSTOMER:
				const customer = await this.customerRepository.findById({
					id: userId,
					select: ['id', 'phone', 'customerRoleId']
				});
				if (!customer) this.i18nExceptionService.throwNotFoundEntity(CustomerEntity.name);
				const resultCustomer = {
					id: customer.id,
					phone: customer.phone,
					role: role,
					customerRoleId: customer.customerRoleId
				};
				await this.redisService.setNx({
					prefix: REDIS_PREFIX_KEY.AUTHENTICATION.REQUEST_USER,
					key: userId,
					value: resultCustomer
				});
				return resultCustomer;
		}
	}
}
