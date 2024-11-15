import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export type I18nValidationOptions = {
	property?: string;
};

export const PROPERTY_NAME = 'PROPERTY_NAME';

export function Property(name: string): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata(PROPERTY_NAME, name, target, propertyKey);
	};
}

function getProperty(target: any, propertyKey: string, options?: I18nValidationOptions) {
	return (
		Reflect.getMetadata(PROPERTY_NAME, target, propertyKey) || options?.property || propertyKey
	);
}

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
