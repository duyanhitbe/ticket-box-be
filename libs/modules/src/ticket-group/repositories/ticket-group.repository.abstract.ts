import { BaseRepository } from '@lib/base/repositories';
import { TicketGroupEntity } from '../entities/ticket-group.entity.abstract';
import { ENUM_DATE_TYPE } from '@lib/modules/common';
import {
	FilterTicketGroupDto,
	RawTicketGroupByEventEntity,
	TicketGroupDetailEntity,
	TicketGroupMinMax
} from '@lib/modules/ticket-group';

export abstract class TicketGroupRepository extends BaseRepository<TicketGroupEntity> {
	abstract findDateTypeByEventId(eventId: string): Promise<ENUM_DATE_TYPE[]>;

	abstract findMinMaxDuration(eventId: string): Promise<TicketGroupMinMax>;

	abstract findMinMaxMixed(eventId: string): Promise<TicketGroupMinMax>;

	abstract findPaginatedByEvent(
		filter: FilterTicketGroupDto,
		agencyLevelId?: string
	): Promise<RawTicketGroupByEventEntity[]>;

	abstract detail(id: string): Promise<TicketGroupDetailEntity>;
}
