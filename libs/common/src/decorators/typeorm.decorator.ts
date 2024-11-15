import { Column, ColumnOptions, Index } from 'typeorm';
import { camelToSnake } from '../helpers';

export function TypeormUnique(name?: string): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		let indexName = `IDX_UNIQUE_${target.constructor.name}_${propertyKey}`;

		if (name) indexName = name;

		Index(indexName, { unique: true, where: '"deleted_at" IS NULL' })(target, propertyKey);
	};
}

export function TypeormColumn(options?: ColumnOptions): PropertyDecorator {
	return function (target: any, propertyKey: string) {
		const name = camelToSnake(propertyKey);
		Column({ ...options, name })(target, propertyKey);
	};
}
