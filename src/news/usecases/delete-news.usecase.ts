import { Injectable } from '@nestjs/common';
import { NewsEntity, NewsRepository } from '@lib/modules/news';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class DeleteNewsUseCase extends ExecuteHandler<NewsEntity> {
	constructor(private readonly newsRepository: NewsRepository) {
		super();
	}

	async execute(id: string): Promise<NewsEntity> {
		return this.newsRepository.softDeleteById({ id });
	}
}
