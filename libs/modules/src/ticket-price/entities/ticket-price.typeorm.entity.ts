import { TicketPriceEntity } from './ticket-price.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne, TypeormUniqueMulti } from '@lib/common/decorators';
import { EventTypeormEntity } from '@lib/modules/event';
import { TicketInfoTypeormEntity } from '@lib/modules/ticket-info';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';
import { AgencyLevelTypeormEntity } from '../../agency-level';

@Entity('ticket_prices')
@TypeormUniqueMulti<TicketPriceTypeormEntity>(['ticketInfoId', 'agencyLevelId'])
export class TicketPriceTypeormEntity extends BaseTypeormEntity implements TicketPriceEntity {
	@TypeormColumn()
	ticketInfoId!: string;

	@TypeormColumn({ nullable: true })
	agencyLevelId!: string;

	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	ticketGroupId!: string;

	@TypeormColumn({ type: 'float' })
	basePrice!: number;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_DISCOUNT_TYPE,
		enumName: 'ENUM_DISCOUNT_TYPE',
		nullable: true
	})
	discountType?: ENUM_DISCOUNT_TYPE;

	@TypeormColumn({ type: 'float', nullable: true })
	discountValue?: number;

	@TypeormColumn({ type: 'float' })
	discountedPrice!: number;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => TicketInfoTypeormEntity)
	ticketInfo?: TicketInfoTypeormEntity;

	@TypeormManyToOne(() => TicketGroupTypeormEntity)
	ticketGroup?: TicketGroupTypeormEntity;

	@TypeormManyToOne(() => AgencyLevelTypeormEntity, undefined, { nullable: true })
	agencyLevel?: AgencyLevelTypeormEntity;
}
