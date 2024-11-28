import { BaseRepository } from '@lib/base/repositories';
import { NewsEntity } from '../entities/news.entity.abstract';

export abstract class NewsRepository extends BaseRepository<NewsEntity> {}
