import { BaseRepository } from '@lib/base/repositories';
import { TicketGroupEntity } from '../entities/ticket-group.entity.abstract';

export abstract class TicketGroupRepository extends BaseRepository<TicketGroupEntity> {}
