import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateNewsDto, FilterNewsDto, NewsEntity, UpdateNewsDto } from '@lib/modules/news';
import { CreateNewsUseCase } from './usecases/create-news.usecase';
import { UpdateNewsUseCase } from './usecases/update-news.usecase';
import { DeleteNewsUseCase } from './usecases/delete-news.usecase';
import { FindNewsUseCase } from './usecases/find-news.usecase';
import { DetailNewsUseCase } from './usecases/detail-news.usecase';
import {
	SwaggerCreatedResponse,
	SwaggerListResponse,
	SwaggerOkResponse,
	UseAuth
} from '@lib/common/decorators';
import { PaginationResponse } from '@lib/base/dto';
import { ONLY_USER_ROLE } from '@lib/core/jwt';

@Controller('news')
export class NewsController {
	constructor(
		private readonly createNewsUseCase: CreateNewsUseCase,
		private readonly updateNewsUseCase: UpdateNewsUseCase,
		private readonly deleteNewsUseCase: DeleteNewsUseCase,
		private readonly findNewsUseCase: FindNewsUseCase,
		private readonly detailNewsUseCase: DetailNewsUseCase
	) {}

	/**
	 * @path POST /api/v1/newss
	 * @param data {CreateNewsDto}
	 * @returns {Promise<NewsEntity>}
	 */
	@UseAuth({ roles: ONLY_USER_ROLE })
	@Post()
	@SwaggerCreatedResponse({ summary: 'Create news', type: NewsEntity })
	create(@Body() data: CreateNewsDto): Promise<NewsEntity> {
		return this.createNewsUseCase.execute(data);
	}

	/**
	 * @path GET /api/v1/newss/:id
	 * @param id {string}
	 * @param data {UpdateNewsDto}
	 * @returns {Promise<NewsEntity>}
	 */
	@UseAuth({ roles: ONLY_USER_ROLE })
	@Patch(':id')
	@SwaggerOkResponse({ summary: 'Update news', type: NewsEntity })
	update(@Param('id') id: string, @Body() data: UpdateNewsDto): Promise<NewsEntity> {
		return this.updateNewsUseCase.execute(id, data);
	}

	/**
	 * @path DELETE /api/v1/newss/:id
	 * @param id {string}
	 * @returns {Promise<NewsEntity>}
	 */
	@UseAuth({ roles: ONLY_USER_ROLE })
	@Delete(':id')
	@SwaggerOkResponse({ summary: 'Remove news', type: NewsEntity })
	remove(@Param('id') id: string): Promise<NewsEntity> {
		return this.deleteNewsUseCase.execute(id);
	}

	/**
	 * @path GET /api/v1/newss
	 * @param filter {FilterNewsDto}
	 * @returns {Promise<PaginationResponse<NewsEntity>>}
	 */
	@Get()
	@SwaggerListResponse({ summary: 'List news', type: NewsEntity })
	findAll(@Query() filter: FilterNewsDto): Promise<PaginationResponse<NewsEntity>> {
		return this.findNewsUseCase.query(filter);
	}

	/**
	 * @path GET /api/v1/newss/:id
	 * @param id {string}
	 * @returns {Promise<NewsEntity>}
	 */
	@Get(':id')
	@SwaggerOkResponse({ summary: 'Detail news', type: NewsEntity })
	findOne(@Param('id') id: string): Promise<NewsEntity> {
		return this.detailNewsUseCase.query(id);
	}
}
