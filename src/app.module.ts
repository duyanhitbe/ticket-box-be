import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@lib/core/interceptors';
import { I18nModule } from '@lib/core/i18n/i18n.module';
import { HttpFilter, TypeormFilter } from '@lib/core/filters';
import { JwtModule } from '@lib/core/jwt/jwt.module';
import { HashModule } from '@lib/core/hash/hash.module';
import { AppRepositoryModule } from './app.repository.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RabbitMQModule } from '@lib/core/rabbitmq/rabbitmq.module';
import { ENUM_QUEUE, ENUM_RABBITMQ_CLIENT } from '@lib/core/rabbitmq';
import { AppTransportModule } from './app.transport.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
			serveRoot: '/public'
		}),
		I18nModule.forRoot(),
		JwtModule.forRoot(),
		HashModule.forRoot(),
		TypeormModule.forRoot(),
		RabbitMQModule.register([
			{
				name: ENUM_RABBITMQ_CLIENT.MAIL,
				queue: ENUM_QUEUE.MAIL
			}
		]),
		AppRepositoryModule,
		AppTransportModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: TypeormFilter
		},
		{
			provide: APP_FILTER,
			useClass: HttpFilter
		}
	]
})
export class AppModule {}
