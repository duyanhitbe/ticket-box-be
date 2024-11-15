import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('Freelance API Documentation')
		.addGlobalParameters({
			in: 'header',
			required: false,
			name: 'x-lang',
			description: 'Language',
			schema: {
				example: 'vi'
			}
		})
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory);
}
