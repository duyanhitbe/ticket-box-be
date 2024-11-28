import { NewsEntity } from './news.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';

@Entity('news')
export class NewsTypeormEntity extends BaseTypeormEntity implements NewsEntity {}
