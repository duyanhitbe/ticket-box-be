import { TicketInfoRepository } from './ticket-info.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { TicketInfoTypeormEntity } from '../entities/ticket-info.typeorm.entity';

@Repository(TicketInfoTypeormEntity)
export class TicketInfoTypeormRepository
	extends BaseTypeormRepository<TicketInfoTypeormEntity>
	implements TicketInfoRepository {}
