import { Module } from '@nestjs/common';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { UserRepository, UserTypeormEntity, UserTypeormRepository } from '@lib/modules/user';

@Module({
	imports: [
		TypeormModule.forFeatures({
			entities: [UserTypeormEntity],
			repositories: [
				{
					provide: UserRepository,
					useClass: UserTypeormRepository
				}
			]
		})
	]
})
export class AppRepositoryModule {}
