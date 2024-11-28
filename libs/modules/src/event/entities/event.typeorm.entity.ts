import { EventEntity } from './event.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('events')
export class EventTypeormEntity extends BaseTypeormEntity implements EventEntity {}
