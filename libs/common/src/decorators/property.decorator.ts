import { I18nValidationOptions } from './i18n.decorator';

export const PROPERTY_NAME = 'PROPERTY_NAME';

export function Property(name: string): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata(PROPERTY_NAME, name, target, propertyKey);
	};
}

export function getProperty(target: any, propertyKey: string, options?: I18nValidationOptions) {
	return (
		Reflect.getMetadata(PROPERTY_NAME, target, propertyKey) || options?.property || propertyKey
	);
}
