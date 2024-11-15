import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@lib/common/swagger';
import { VersioningType } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});
	app.setGlobalPrefix('api');
	app.useGlobalPipes(
		new I18nValidationPipe({
			transform: true,
			whitelist: true
		})
	);
	setupSwagger(app);
	await app.listen(3000);
}

bootstrap();
