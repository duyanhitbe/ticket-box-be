import {
	CanActivate,
	ExecutionContext,
	forwardRef,
	Inject,
	Injectable,
	Logger
} from '@nestjs/common';
import { JwtService } from '@lib/core/jwt';
import { I18nExceptionService } from '@lib/core/i18n';
import { UserEntity, UserRepository } from '@lib/modules/user';

@Injectable()
export class AuthenticationUserGuard implements CanActivate {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		@Inject(forwardRef(() => UserRepository))
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
		private readonly i18nExceptionService: I18nExceptionService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const accessToken = request.headers.authorization.split(' ')[1];

		if (!accessToken) {
			this.logger.error('Missing authorization header');
			this.i18nExceptionService.throwMissingAuthorization();
		}

		let userId = '';

		try {
			const payload = await this.jwtService.verify(accessToken);
			userId = payload.sub;
		} catch (err) {
			this.logger.error('Invalid access token');
			this.logger.error(err.message);
			this.i18nExceptionService.throwInvalidAuthorization();
		}

		if (userId === '') this.i18nExceptionService.throwInvalidAuthorization();

		const user = await this.userRepository.findById({
			id: userId,
			select: ['id', 'username']
		});
		if (!user) this.i18nExceptionService.throwNotFoundEntity(UserEntity.name);

		request['user'] = user;

		return true;
	}
}
