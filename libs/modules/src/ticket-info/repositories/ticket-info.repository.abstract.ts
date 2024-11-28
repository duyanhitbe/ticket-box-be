import { BaseRepository } from '@lib/base/repositories';
import { TicketInfoEntity } from '../entities/ticket-info.entity.abstract';

export abstract class TicketInfoRepository extends BaseRepository<TicketInfoEntity> {}
