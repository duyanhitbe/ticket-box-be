import { BaseRepository } from '@lib/base/repositories';
import { OrderEntity } from '../entities/order.entity.abstract';
import { OrderTypeormEntity } from '@lib/modules/order';

export abstract class OrderRepository extends BaseRepository<OrderEntity> {
	abstract updateOrderById(id: string, data: Partial<OrderTypeormEntity>): Promise<void>;
}
