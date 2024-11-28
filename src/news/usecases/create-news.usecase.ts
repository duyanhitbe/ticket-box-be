import { Injectable } from '@nestjs/common';
import { CreateNewsDto, NewsEntity, NewsRepository } from '@lib/modules/news';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class CreateNewsUseCase extends ExecuteHandler<NewsEntity> {
	constructor(private readonly newsRepository: NewsRepository) {
		super();
	}

	async execute(data: CreateNewsDto): Promise<NewsEntity> {
		return this.newsRepository.create({ data });
	}
}
