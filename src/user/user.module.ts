import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { UserTypeormEntity } from './entities/user.typeorm.entity';
import { UserTypeormRepository } from './repositories/user.typeorm.repository';
import { IUserRepository } from './repositories/user.repository.abstract';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { FindUserUseCase } from './usecases/find-user.usecase';
import { DetailUserUseCase } from './usecases/detail-user.usecase';

@Module({
	imports: [
		TypeormModule.forFeatures({
			entities: [UserTypeormEntity],
			repositories: [
				{
					provide: IUserRepository,
					implementation: UserTypeormRepository
				}
			]
		})
	],
	controllers: [UserController],
	providers: [
		CreateUserUseCase,
		UpdateUserUseCase,
		DeleteUserUseCase,
		FindUserUseCase,
		DetailUserUseCase
	]
})
export class UserModule {}
