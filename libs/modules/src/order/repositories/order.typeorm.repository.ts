import { OrderRepository } from './order.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { OrderTypeormEntity } from '../entities/order.typeorm.entity';
import { CreateOptions, UpdateByIdOptions } from '@lib/base/types';
import { randomString } from '@lib/common/helpers';
import { ENUM_ORDER_STATUS } from '../order.enum';
import { BadRequestException } from '@nestjs/common';

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

	async updateById(options: UpdateByIdOptions<OrderTypeormEntity>): Promise<OrderTypeormEntity> {
		const { id, data, relations } = options;
		const { orderStatus } = data;

		const order = await this.findByIdOrThrow({ id, relations });

		if (orderStatus) {
			const isAllowUpdateStatus = order.orderStatus === ENUM_ORDER_STATUS.RESERVED;
			const isUpdateSameStatus = order.orderStatus === data.orderStatus;

			if (!isAllowUpdateStatus || isUpdateSameStatus) {
				this.logger.debug({ data, order });
				throw new BadRequestException('Can not update order status');
			}
		}
		Object.assign(order, data);

		return order.save();
	}
}
