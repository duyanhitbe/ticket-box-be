import { OrderRepository } from './order.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { OrderTypeormEntity } from '../entities/order.typeorm.entity';
import { CreateOptions } from '@lib/base/types';
import { randomString } from '@lib/common/helpers';

@Repository(OrderTypeormEntity)
export class OrderTypeormRepository
	extends BaseTypeormRepository<OrderTypeormEntity>
	implements OrderRepository
{
	async create(options: CreateOptions<OrderTypeormEntity>): Promise<OrderTypeormEntity> {
		options.data.code = await this.getCode();
		return super.create(options);
	}

	private async getCode(): Promise<string> {
		const code = randomString(10);
		const exist = await this.exists({
			where: {
				code
			}
		});
		if (exist) return this.getCode();
		return code;
	}

	async updateOrderById(id: string, data: Partial<OrderTypeormEntity>): Promise<void> {
		await this.repository.update(id, data);
	}
}
