import { OrderDetailEntity } from './order-detail.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('order-details')
export class OrderDetailTypeormEntity extends BaseTypeormEntity implements OrderDetailEntity {}
