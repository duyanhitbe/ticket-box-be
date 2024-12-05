import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@lib/common/swagger';
import { Logger, VersioningType } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { Env } from '@lib/common/interfaces';
import { LoggerService } from '@lib/core/logger';
import { connectRabbitMQ, ENUM_QUEUE } from '@lib/core/rabbitmq';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggerService()
	});
	const configService = app.get<ConfigService<Env>>(ConfigService);
	const port = +configService.get('PORT');
	const baseUrl = configService.get('BASE_URL');

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});
	app.setGlobalPrefix('api', {
		exclude: ['/']
	});
	app.enableCors({
		credentials: true,
		origin: '*'
	});
	app.useGlobalPipes(
		new I18nValidationPipe({
			transform: true,
			whitelist: true
		})
	);
	setupSwagger(app);

	connectRabbitMQ(app, configService, [ENUM_QUEUE.MAIL, ENUM_QUEUE.ORDER]);

	await app.startAllMicroservices();
	await app.listen(port);

	const logger = new Logger('NestApplication');
	logger.log(`Server is running on ${baseUrl}`);
	logger.log(`Swagger is running on ${baseUrl}/docs`);
}

bootstrap();
