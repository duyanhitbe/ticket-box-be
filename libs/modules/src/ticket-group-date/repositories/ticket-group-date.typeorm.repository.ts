import { TicketGroupDateRepository } from './ticket-group-date.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketGroupDateTypeormEntity } from '../entities/ticket-group-date.typeorm.entity';

@Repository(TicketGroupDateTypeormEntity)
export class TicketGroupDateTypeormRepository
	extends BaseTypeormRepository<TicketGroupDateTypeormEntity>
	implements TicketGroupDateRepository
{
	async findDateByEventId(eventId: string, startOfDay: Date): Promise<Date[]> {
		return this.repository
			.createQueryBuilder()
			.select('date')
			.where('event_id = :eventId', { eventId })
			.andWhere('date >= :startOfDay', { startOfDay: startOfDay.toISOString() })
			.orderBy('date')
			.groupBy('date')
			.getRawMany()
			.then((res) => res.map((item) => item.date));
	}
}
