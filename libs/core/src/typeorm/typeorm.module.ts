import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeormForFeaturesOptions } from './typeorm.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { REPOSITORY_ENTITY } from './typeorm.decorator';
import { Env } from '@lib/common/interfaces';

@Module({})
export class TypeormModule {
	static forRoot(): DynamicModule {
		return {
			module: TypeormModule,
			imports: [
				TypeOrmModule.forRootAsync({
					inject: [ConfigService],
					useFactory: (configService: ConfigService<Env>) => ({
						type: 'postgres',
						host: configService.get('POSTGRES_HOST'),
						port: +configService.get('POSTGRES_PORT'),
						username: configService.get('POSTGRES_USER'),
						password: configService.get('POSTGRES_PASSWORD'),
						database: configService.get('POSTGRES_DB'),
						autoLoadEntities: true,
						synchronize: true
					})
				})
			]
		};
	}

	static forFeatures(options: TypeormForFeaturesOptions): DynamicModule {
		const { entities, repositories } = options;

		const providers: Provider[] = repositories.map(({ provide, implementation }) => ({
			provide,
			inject: [DataSource],
			useFactory: (dataSource: DataSource) => {
				const entity = Reflect.getOwnMetadata(REPOSITORY_ENTITY, implementation);
				const repository = dataSource.getRepository(entity);
				return new implementation(repository);
			}
		}));

		return {
			module: TypeormModule,
			imports: [TypeOrmModule.forFeature(entities)],
			providers,
			exports: providers
		};
	}
}
