import {
	CreateOptions,
	FindByIdOptions,
	FindOneOptions,
	FindOptions,
	FindPaginatedOptions
} from '../types';
import { BaseEntity } from '../entities';
import { PaginationResponse } from '../dto';

export abstract class BaseRepository<T extends BaseEntity> {
	abstract create(options: CreateOptions<T>): Promise<T>;

	abstract find(options: FindOptions<T>): Promise<T[]>;

	abstract findPaginated(options: FindPaginatedOptions<T>): Promise<PaginationResponse<T>>;

	abstract findById(options: FindByIdOptions): Promise<T | null>;

	abstract findOne(options: FindOneOptions<T>): Promise<T | null>;

	abstract update(options: any): Promise<T[]>;

	abstract updateOne(options: any): Promise<T>;

	abstract updateById(options: any): Promise<T>;

	abstract delete(options: any): Promise<T[]>;

	abstract deleteOne(options: any): Promise<T>;

	abstract deleteById(options: any): Promise<T>;

	abstract softDelete(options: any): Promise<T[]>;

	abstract softDeleteOne(options: any): Promise<T>;

	abstract softDeleteById(options: any): Promise<T>;
}
