import { EventDateEntity } from './event-date.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('event_dates')
export class EventDateTypeormEntity extends BaseTypeormEntity implements EventDateEntity {}
