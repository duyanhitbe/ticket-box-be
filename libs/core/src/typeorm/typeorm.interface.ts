import { Type } from '@nestjs/common';

export interface TypeormForFeaturesOptions {
	entities: Type[];
	repositories: TypeormForFeaturesRepositories[];
}

export interface TypeormForFeaturesRepositories {
	provide: any;
	useClass: Type;
}
