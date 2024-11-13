import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@lib/common/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});
	app.setGlobalPrefix('api');
	setupSwagger(app);
	await app.listen(3000);
}

bootstrap();
