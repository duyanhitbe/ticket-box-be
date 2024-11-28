import { Injectable } from '@nestjs/common';
import { UpdateNewsDto, NewsEntity, NewsRepository } from '@lib/modules/news';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class UpdateNewsUseCase extends ExecuteHandler<NewsEntity> {
	constructor(private readonly newsRepository: NewsRepository) {
		super();
	}

	async execute(id: string, data: UpdateNewsDto): Promise<NewsEntity> {
		return this.newsRepository.updateById({ id, data });
	}
}
