import { CustomerEntity } from './customer.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('customers')
export class CustomerTypeormEntity extends BaseTypeormEntity implements CustomerEntity {}
