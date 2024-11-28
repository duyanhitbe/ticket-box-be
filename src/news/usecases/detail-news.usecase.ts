import { Injectable } from '@nestjs/common';
import { NewsEntity, NewsRepository } from '@lib/modules/news';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class DetailNewsUseCase extends QueryHandler<NewsEntity> {
	constructor(private readonly newsRepository: NewsRepository) {
		super();
	}

	async query(id: string): Promise<NewsEntity> {
		return this.newsRepository.findByIdOrThrow({ id });
	}
}
