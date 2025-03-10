import { BaseRepository } from '@lib/base/repositories';
import { TicketGroupDateEntity } from '../entities/ticket-group-date.entity.abstract';

export abstract class TicketGroupDateRepository extends BaseRepository<TicketGroupDateEntity> {
	abstract findDateByEventId(eventId: string, startOfDay: Date): Promise<Date[]>;
}
