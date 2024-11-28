import { OrderEntity } from './order.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('orders')
export class OrderTypeormEntity extends BaseTypeormEntity implements OrderEntity {}
