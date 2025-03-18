import { BaseRepository } from '@lib/base/repositories';
import { TicketPriceEntity } from '../entities/ticket-price.entity.abstract';
import { TicketPriceTypeormEntity } from '../entities/ticket-price.typeorm.entity';

export abstract class TicketPriceRepository extends BaseRepository<TicketPriceEntity> {
	abstract findNormalCustomerByTicketInfo(
		ticketInfoId: string
	): Promise<Pick<
		TicketPriceTypeormEntity,
		'id' | 'basePrice' | 'discountedPrice' | 'discountType' | 'discountValue'
	> | null>;
}
