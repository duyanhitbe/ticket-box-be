import { Injectable } from '@nestjs/common';
import { FilterDetailNewsDto, NewsEntity, NewsRepository } from '@lib/modules/news';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailNewsUseCase extends QueryHandler<NewsEntity> {
	constructor(private readonly newsRepository: NewsRepository) {
		super();
	}

	async query(id: string, filter: FilterDetailNewsDto): Promise<NewsEntity> {
		const { slug } = filter;

		if (slug) {
			return this.newsRepository.findOneBySlug(slug);
		}

		return this.newsRepository.findByIdOrThrow({ id });
	}
}
