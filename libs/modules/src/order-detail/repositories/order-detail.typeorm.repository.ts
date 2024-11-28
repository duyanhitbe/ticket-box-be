import { OrderDetailRepository } from './order-detail.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { OrderDetailTypeormEntity } from '../entities/order-detail.typeorm.entity';

@Repository(OrderDetailTypeormEntity)
export class OrderDetailTypeormRepository
	extends BaseTypeormRepository<OrderDetailTypeormEntity>
	implements OrderDetailRepository {}
