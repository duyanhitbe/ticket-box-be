import { OrderRepository } from './order.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { OrderTypeormEntity } from '../entities/order.typeorm.entity';

@Repository(OrderTypeormEntity)
export class OrderTypeormRepository
	extends BaseTypeormRepository<OrderTypeormEntity>
	implements OrderRepository {}
