import { DeepPartial, Repository } from 'typeorm';
import {
	CreateOptions,
	DeleteByIdOptions,
	DeleteManyOptions,
	DeleteOneOptions,
	FindByIdOptions,
	FindOneOptions,
	FindOptions,
	FindPaginatedOptions,
	SoftDeleteByIdOptions,
	SoftDeleteManyOptions,
	SoftDeleteOneOptions,
	UpdateByIdOptions,
	UpdateManyOptions,
	UpdateOneOptions
} from '../types';
import { BaseTypeormEntity } from '../entities';
import { PaginationResponse } from '../dto';
import { BaseRepository } from '../repositories/repository.base.abstract';
import { NotFoundException } from '@nestjs/common';

export class BaseTypeormRepository<T extends BaseTypeormEntity> implements BaseRepository<T> {
	constructor(private readonly repository: Repository<T>) {}

	create(options: CreateOptions<T>): Promise<T> {
		const { data } = options;
		return this.repository.create(data as DeepPartial<T>).save();
	}

	find(options: FindOptions<T>): Promise<T[]> {
		const { where } = options;
		return this.repository.find({ where });
	}

	async findPaginated(options: FindPaginatedOptions<T>): Promise<PaginationResponse<T>> {
		const { where, offset } = options;

		let order = options.order;
		if (!order) order = {};
		order.createdAt = 'DESC';

		const limit = +(options.limit || 25);
		const page = +(options.page || 1);
		const take = limit || 10;
		const skip = offset || limit * (page - 1) || 0;

		const [data, totalItem] = await this.repository.findAndCount({
			where,
			take,
			skip,
			order: order as any
		});

		const totalPage = totalItem < limit ? 1 : Math.floor(totalItem / limit);
		const prevPage = page === 1 ? null : page - 1;
		const nextPage = page === totalPage ? null : page + 1;

		return {
			data,
			meta: {
				limit,
				page,
				totalItem,
				totalPage,
				prevPage,
				nextPage
			}
		};
	}

	findById(options: FindByIdOptions): Promise<T | null> {
		const { id } = options;
		return this.repository.findOne({ where: { id } } as any);
	}

	findOne(options: FindOneOptions<T>): Promise<T | null> {
		const { where } = options;
		return this.repository.findOne({ where });
	}

	async update(options: UpdateManyOptions<T>): Promise<T[]> {
		const { where, data } = options;
		const entities = await this.repository.find({ where });
		return Promise.all(
			entities.map((entity) => {
				Object.assign(entity, data);
				return this.repository.save(entity);
			})
		);
	}

	async updateOne(options: UpdateOneOptions<T>): Promise<T> {
		const { where, data } = options;
		const entity = await this.findOne({ where });

		if (!entity) {
			throw new NotFoundException();
		}

		Object.assign(entity, data);

		return this.repository.save(entity);
	}

	async updateById(options: UpdateByIdOptions<T>): Promise<T> {
		const { id, data } = options;
		const entity = await this.findById({ id });

		if (!entity) {
			throw new NotFoundException();
		}

		Object.assign(entity, data);

		return this.repository.save(entity);
	}

	async delete(options: DeleteManyOptions<T>): Promise<T[]> {
		const { where } = options;
		const entities = await this.repository.find({ where });
		return this.repository.remove(entities);
	}

	async deleteOne(options: DeleteOneOptions<T>): Promise<T> {
		const { where } = options;
		const entity = await this.findOne({ where });

		if (!entity) {
			throw new NotFoundException();
		}

		return this.repository.remove(entity);
	}

	async deleteById(options: DeleteByIdOptions<T>): Promise<T> {
		const { id } = options;
		const entity = await this.findById({ id });

		if (!entity) {
			throw new NotFoundException();
		}

		return this.repository.remove(entity);
	}

	async softDelete(options: SoftDeleteManyOptions<T>): Promise<T[]> {
		const { where } = options;
		const entities = await this.repository.find({ where });
		return this.repository.softRemove(entities);
	}

	async softDeleteOne(options: SoftDeleteOneOptions<T>): Promise<T> {
		const { where } = options;
		const entity = await this.findOne({ where });

		if (!entity) {
			throw new NotFoundException();
		}

		return this.repository.softRemove(entity);
	}

	async softDeleteById(options: SoftDeleteByIdOptions<T>): Promise<T> {
		const { id } = options;
		const entity = await this.findById({ id });

		if (!entity) {
			throw new NotFoundException();
		}

		return this.repository.softRemove(entity);
	}
}
