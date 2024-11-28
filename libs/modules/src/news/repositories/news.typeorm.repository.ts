import { NewsRepository } from './news.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { NewsTypeormEntity } from '../entities/news.typeorm.entity';

@Repository(NewsTypeormEntity)
export class NewsTypeormRepository
	extends BaseTypeormRepository<NewsTypeormEntity>
	implements NewsRepository {}
