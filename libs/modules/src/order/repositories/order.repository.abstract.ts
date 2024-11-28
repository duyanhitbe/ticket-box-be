import { BaseRepository } from '@lib/base/repositories';
import { OrderEntity } from '../entities/order.entity.abstract';

export abstract class OrderRepository extends BaseRepository<OrderEntity> {}
