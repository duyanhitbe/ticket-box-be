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

export type CreateOptions<T extends BaseEntity> = {
	data: Data<T>;
};

export type FindOptions<T extends BaseEntity> = {
	where?: Where<T>;
	order?: Order<T>;
};

export type FindPaginatedOptions<T extends BaseEntity> = {
	where?: Where<T>;
	order?: Order<T>;
	limit?: number | string;
	page?: number | string;
	offset?: number;
};

export type FindByIdOptions = {
	id: string;
};

export type FindOneOptions<T extends BaseEntity> = {
	where?: Where<T>;
};

export type UpdateManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
	data: Data<T>;
};

export type UpdateOneOptions<T extends BaseEntity> = {
	where: Where<T>;
	data: Data<T>;
};

export type UpdateByIdOptions<T extends BaseEntity> = {
	id: string;
	data: Data<T>;
};

export type DeleteManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
};

export type DeleteOneOptions<T extends BaseEntity> = {
	where: Where<T>;
};

export type DeleteByIdOptions<T extends BaseEntity> = {
	id: string;
};

export type SoftDeleteManyOptions<T extends BaseEntity> = {
	where: Where<T>;
	order?: Order<T>;
};

export type SoftDeleteOneOptions<T extends BaseEntity> = {
	where: Where<T>;
};

export type SoftDeleteByIdOptions<T extends BaseEntity> = {
	id: string;
};
