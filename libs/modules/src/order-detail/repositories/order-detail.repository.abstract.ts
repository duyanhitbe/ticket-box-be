import { BaseRepository } from '@lib/base/repositories';
import { OrderDetailEntity } from '../entities/order-detail.entity.abstract';

export abstract class OrderDetailRepository extends BaseRepository<OrderDetailEntity> {}
