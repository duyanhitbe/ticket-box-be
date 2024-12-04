import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserEntity, UserRepository } from '@lib/modules/user';
import { I18nExceptionService, TranslateService } from '@lib/core/i18n';
import { ExecuteHandler } from '@lib/common/abstracts';
import { ENUM_RABBITMQ_CLIENT, InjectClientRMQ, RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { RabbitmqService } from '@lib/core/rabbitmq/rabbitmq.service.abstract';

@Injectable()
export class CreateUserUseCase extends ExecuteHandler<UserEntity> {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.MAIL)
		private readonly mailClient: RabbitmqService,
		private readonly userRepository: UserRepository,
		private readonly translateService: TranslateService,
		private readonly i18nExceptionService: I18nExceptionService
	) {
		super();
	}

	async execute(data: CreateUserDto): Promise<UserEntity> {
		const exists = await this.userRepository.exists({
			where: {
				username: data.username
			}
		});
		if (exists) {
			const property = this.translateService.field('USERNAME');
			this.i18nExceptionService.throwExists(property);
		}

		const user = await this.userRepository.create({ data });

		this.mailClient.emit(RABBITMQ_PATTERNS.SEND_MAIL, user);

		return user;
	}
}
