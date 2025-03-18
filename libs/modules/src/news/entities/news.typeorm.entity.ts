import { NewsEntity } from './news.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn } from '@lib/common/decorators';

@Entity('news')
export class NewsTypeormEntity extends BaseTypeormEntity implements NewsEntity {
	@TypeormColumn()
	title!: string;

	@TypeormColumn()
	thumbnail!: string;

	@TypeormColumn()
	content!: string;

	@TypeormColumn()
	order!: number;
}
