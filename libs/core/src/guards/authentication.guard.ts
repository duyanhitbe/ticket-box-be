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
import { UserRepository } from '@lib/modules/user';
import { RequestUser } from '@lib/common/interfaces';
import { CustomerRepository } from '@lib/modules/customer';
import { Reflector } from '@nestjs/core';

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
		private readonly reflector: Reflector
		// private readonly redisService: RedisService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		let accessToken = request.headers.authorization?.split(' ')[1];

		if (request.session?.accessToken) {
			accessToken = request.session.accessToken;
		}

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
			let sub = '';
			let role: ENUM_TOKEN_ROLE | null = null;

			try {
				const payload = await this.jwtService.verify(accessToken);
				sub = payload.sub;
				role = payload.role;
			} catch (err) {
				this.logger.error('Invalid access token');
				this.logger.error(err.message);
				this.i18nExceptionService.throwInvalidAuthorization();
			}

			if (sub === '' || !role) {
				this.i18nExceptionService.throwInvalidAuthorization();
			}

			request['user'] = await this.getUserByRole(sub, role);
			const end = performance.now();
			const duration = (end - start).toFixed();
			this.logger.log(`Authenticated incoming user took ${duration}ms`);
		}

		return true;
	}

	private async getUserByRole(sub: string, role: ENUM_TOKEN_ROLE): Promise<RequestUser> {
		switch (role) {
			case ENUM_TOKEN_ROLE.USER:
				const user = await this.userRepository.findByIdOrThrow({
					id: sub,
					select: ['id', 'username']
				});
				return { id: user.id, username: user.username, role: role };
			case ENUM_TOKEN_ROLE.CUSTOMER:
				const customer = await this.customerRepository.findByIdOrThrow({
					id: sub,
					select: ['id', 'phone']
				});
				return {
					id: customer.id,
					phone: customer.phone,
					role: role
				};
			case ENUM_TOKEN_ROLE.AGENCY:
				const agency = await this.customerRepository.findByIdOrThrow({
					id: sub,
					relations: ['agency', 'agency.events'],
					select: {
						id: true,
						phone: true,
						agencyLevelId: true,
						agency: {
							id: true,
							events: {
								id: true
							}
						}
					}
				});
				return {
					id: agency.id,
					phone: agency.phone,
					role: role,
					agencyLevelId: agency.agencyLevelId,
					eventIds: agency.agency?.events?.map((event) => event.id)
				};
		}
	}
}
