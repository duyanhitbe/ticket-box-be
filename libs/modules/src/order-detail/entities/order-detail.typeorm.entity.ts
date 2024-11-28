import { OrderDetailEntity } from './order-detail.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('order_details')
export class OrderDetailTypeormEntity extends BaseTypeormEntity implements OrderDetailEntity {}
