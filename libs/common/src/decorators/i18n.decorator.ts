import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { getProperty } from './property.decorator';

export type I18nValidationOptions = {
	property?: string;
};

export function I18nIsString(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsString({
			message: i18nValidationMessage('validation.IS_STRING', {
				property
			})
		})(target, propertyKey);
	};
}

export function I18nIsNotEmpty(options?: I18nValidationOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const property = getProperty(target, propertyKey, options);
		IsNotEmpty({
			message: i18nValidationMessage('validation.IS_NOT_EMPTY', {
				property
			})
		})(target, propertyKey);
	};
}
