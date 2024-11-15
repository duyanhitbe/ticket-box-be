import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
	constructor(private readonly i18nService: I18nService) {}

	entityName(entityName: string): string {
		return this.i18nService.translate(`entity.${entityName}`);
	}

	field(field: string) {
		return this.i18nService.translate(`field.${field}`);
	}

	notExistsMessage(property: string): string {
		return this.i18nService.translate('validation.NOT_EXISTS', {
			args: {
				property
			}
		});
	}

	existsMessage(property: string): string {
		return this.i18nService.translate('validation.EXISTS', {
			args: {
				property
			}
		});
	}
}
