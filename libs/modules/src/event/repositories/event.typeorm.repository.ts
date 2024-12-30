import { EventRepository } from './event.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { EventTypeormEntity } from '../entities/event.typeorm.entity';

@Repository(EventTypeormEntity)
export class EventTypeormRepository
	extends BaseTypeormRepository<EventTypeormEntity>
	implements EventRepository
{
	async findLocation(): Promise<string[]> {
		const res = await this.repository
			.createQueryBuilder('e')
			.select('location')
			.groupBy('location')
			.getRawMany();

		return res
			.map((event) => event.location)
			.filter((location) => Boolean(location)) as string[];
	}
}
