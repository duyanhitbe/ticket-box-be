import { ConflictException, Injectable } from '@nestjs/common';
import { TranslateService } from '@lib/core/i18n/translate.service';

@Injectable()
export class I18nExceptionService {
	constructor(private readonly translateService: TranslateService) {}

	throwExists(property: string) {
		const message = this.translateService.existsMessage(property);
		throw new ConflictException(message);
	}
}
