import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TypeormForFeaturesOptions } from './typeorm.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { REPOSITORY_ENTITY } from './typeorm.decorator';
import { I18nExceptionService } from '@lib/core/i18n';
import { options } from '@lib/core/typeorm/typeorm.config';

@Global()
@Module({})
export class TypeormModule {
	static forRoot(): DynamicModule {
		return {
			module: TypeormModule,
			imports: [
				TypeOrmModule.forRootAsync({
					inject: [ConfigService],
					useFactory: () => options
				})
			]
		};
	}

	static forFeatures(options: TypeormForFeaturesOptions): DynamicModule {
		const { entities, repositories } = options;

		const exports: any[] = [];
		const providers: Provider[] = repositories.map(({ provide, useClass: Repository }) => {
			exports.push(provide);
			return {
				provide,
				inject: [DataSource, I18nExceptionService],
				useFactory: (
					dataSource: DataSource,
					i18nExceptionService: I18nExceptionService
				) => {
					const entity = Reflect.getOwnMetadata(REPOSITORY_ENTITY, Repository);
					const repository = dataSource.getRepository(entity);
					return new Repository(repository, entity.name, i18nExceptionService);
				}
			};
		});

		return {
			module: TypeormModule,
			global: true,
			imports: [TypeOrmModule.forFeature(entities)],
			providers,
			exports
		};
	}
}
