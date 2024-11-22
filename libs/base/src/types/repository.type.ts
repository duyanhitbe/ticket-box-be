import { BaseEntity } from '../entities';

export type Where<T extends BaseEntity> = {
	[P in keyof T]?: any;
};

export type Data<T extends BaseEntity> = {
	[P in keyof T]?: any;
};

export type OrderType = 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1;

export type Order<T extends BaseEntity> = {
	[P in keyof T]?: OrderType;
};

export type Select<T extends BaseEntity> = (keyof T)[];

export type NotExistsMessage = {
	notExistsMessage?: string;
};

export type CreateOptions<T extends BaseEntity> = {
	data: Data<T>;
	select?: Select<T>;
};

export type FindOptions<T extends BaseEntity> = {
	where?: Where<T>;
	order?: Order<T>;
	select?: Select<T>;
};

export type FindPaginatedOptions<T extends BaseEntity> = {
	where?: Where<T>;
	order?: Order<T>;
	limit?: number | string;
	page?: number | string;
	offset?: number;
	select?: Select<T>;
};

export type FindByIdOptions<T extends BaseEntity> = {
	id: string;
	select?: Select<T>;
};

export type FindOneOptions<T extends BaseEntity> = {
	where?: Where<T>;
	select?: Select<T>;
};

export type UpdateManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	data: Data<T>;
	select?: Select<T>;
};

export type UpdateOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	data: Data<T>;
	select?: Select<T>;
};

export type UpdateByIdOptions<T extends BaseEntity> = {
	id: string;
	data: Data<T>;
	select?: Select<T>;
};

export type DeleteManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	select?: Select<T>;
};

export type DeleteOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	select?: Select<T>;
};

export type DeleteByIdOptions<T extends BaseEntity> = {
	id: string;
	select?: Select<T>;
};

export type SoftDeleteManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	select?: Select<T>;
};

export type SoftDeleteOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	select?: Select<T>;
};

export type SoftDeleteByIdOptions<T extends BaseEntity> = {
	id: string;
	select?: Select<T>;
};

export type ExistOptions<T extends BaseEntity> = {
	where?: Where<T>;
	select?: Select<T>;
};
