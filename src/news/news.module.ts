import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { CreateNewsUseCase } from './usecases/create-news.usecase';
import { UpdateNewsUseCase } from './usecases/update-news.usecase';
import { DeleteNewsUseCase } from './usecases/delete-news.usecase';
import { FindNewsUseCase } from './usecases/find-news.usecase';
import { DetailNewsUseCase } from './usecases/detail-news.usecase';

@Module({
	controllers: [NewsController],
	providers: [
		CreateNewsUseCase,
		UpdateNewsUseCase,
		DeleteNewsUseCase,
		FindNewsUseCase,
		DetailNewsUseCase
	]
})
export class NewsModule {}
