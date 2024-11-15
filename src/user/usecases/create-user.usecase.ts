import { Injectable } from '@nestjs/common';
import { IExecuteHandler } from '@lib/common/interfaces';
import { UserEntity } from '../entities/user.entity.abstract';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../repositories/user.repository.abstract';
import { I18nExceptionService } from '@lib/core/i18n/i18n-exception.service';
import { TranslateService } from '@lib/core/i18n/translate.service';

@Injectable()
export class CreateUserUseCase implements IExecuteHandler<UserEntity> {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly translateService: TranslateService,
		private readonly i18nExceptionService: I18nExceptionService
	) {}

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

		return this.userRepository.create({ data });
	}
}
