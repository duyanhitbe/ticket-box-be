import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { TicketGroupDateModule } from './ticket-group-date/ticket-group-date.module';
import { EventModule } from '@lib/core/event/event.module';
import { LoggerMiddleware } from '@lib/core/middlewares';
import { NodemailerModule } from '@lib/core/nodemailer/nodemailer.module';
import { ExcelModule } from '@lib/core/excel/excel.module';

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
			},
			{
				name: ENUM_RABBITMQ_CLIENT.ORDER,
				queue: ENUM_QUEUE.ORDER
			}
		]),
		EventModule.forRoot(),
		// RedisModule.forRoot(),
		ExcelModule,
		NodemailerModule.forRoot(),
		AppRepositoryModule,
		AppTransportModule,
		TicketGroupDateModule
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
export class AppModule implements NestModule {
	constructor() {} // private readonly configService: ConfigService<Env> // private readonly redis: Redis, // @InjectRedis()

	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				// session({
				// 	name: 'session',
				// 	store: new RedisStore({
				// 		client: this.redis,
				// 		prefix: 'SESSION:'
				// 	}),
				// 	secret: this.configService.get('SESSION_SECRET')!,
				// 	resave: false,
				// 	saveUninitialized: false,
				// 	cookie: {
				// 		maxAge: ACCESS_TOKEN_EXPIRES * 1000,
				// 		secure: false,
				// 		httpOnly: true,
				// 		sameSite: 'lax',
				// 		signed: true
				// 	}
				// }),
				LoggerMiddleware
			)
			.forRoutes('*');
	}
}
