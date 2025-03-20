import { NewsRepository } from './news.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { NewsTypeormEntity } from '../entities/news.typeorm.entity';
import { NewsEntity } from '../entities/news.entity.abstract';

@Repository(NewsTypeormEntity)
export class NewsTypeormRepository
	extends BaseTypeormRepository<NewsTypeormEntity>
	implements NewsRepository
{
	async findOneBySlug(slug: string): Promise<NewsEntity> {
		return this.findOneOrThrow({
			where: { slug }
		});
	}
}
