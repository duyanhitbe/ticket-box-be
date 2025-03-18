import { Injectable } from '@nestjs/common';
import { FilterNewsDto, NewsEntity, NewsRepository } from '@lib/modules/news';
import { PaginationResponse } from '@lib/base/dto';
import { QueryHandler } from '@lib/common/abstracts';

@Injectable()
export class FindNewsUseCase extends QueryHandler<PaginationResponse<NewsEntity>> {
	constructor(private readonly newsRepository: NewsRepository) {
		super();
	}

	async query(filter: FilterNewsDto): Promise<PaginationResponse<NewsEntity>> {
		return this.newsRepository.findPaginated(filter);
	}
}
