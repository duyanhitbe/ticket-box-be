import { DynamicModule, Global, Module } from '@nestjs/common';
import * as path from 'path';
import { HeaderResolver, I18nModule as NestI18nModule } from 'nestjs-i18n';
import { I18nExceptionService } from '@lib/core/i18n/i18n-exception.service';
import { TranslateService } from '@lib/core/i18n/translate.service';

@Global()
@Module({
	providers: [I18nExceptionService, TranslateService],
	exports: [I18nExceptionService, TranslateService]
})
export class I18nModule {
	static forRoot(): DynamicModule {
		return {
			module: I18nModule,
			imports: [
				NestI18nModule.forRoot({
					fallbackLanguage: 'vi',
					loaderOptions: {
						path: path.join(__dirname, '../i18n/'),
						watch: true
					},
					resolvers: [new HeaderResolver(['x-lang'])]
				})
			]
		};
	}
}
