import { Type } from '@nestjs/common';

export const REPOSITORY_ENTITY = 'REPOSITORY_ENTITY';

export function Repository(entity: Type): ClassDecorator {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return (target: Object) => {
		Reflect.defineMetadata(REPOSITORY_ENTITY, entity, target);
	};
}
