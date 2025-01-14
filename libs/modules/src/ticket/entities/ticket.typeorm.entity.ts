import { TicketEntity } from './ticket.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { CustomerTypeormEntity } from '@lib/modules/customer';
import { EventTypeormEntity } from '@lib/modules/event';
import { OrderTypeormEntity } from '@lib/modules/order';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';
import { TicketInfoTypeormEntity } from '@lib/modules/ticket-info';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne, TypeormUniqueMulti } from '@lib/common/decorators';

@Entity('tickets')
@TypeormUniqueMulti<TicketTypeormEntity>(['eventId', 'code'])
export class TicketTypeormEntity extends BaseTypeormEntity implements TicketEntity {
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	ticketGroupId!: string;

	@TypeormColumn()
	ticketInfoId!: string;

	@TypeormColumn({ nullable: true })
	orderId?: string;

	@TypeormColumn({ nullable: true })
	customerId?: string;

	@TypeormColumn()
	code!: string;

	@TypeormColumn({ nullable: true, type: 'timestamptz' })
	useAt?: Date;

	@TypeormColumn({ nullable: true })
	expiresAt?: Date;

	@TypeormColumn({ type: 'float', nullable: true })
	basePrice?: number;

	@TypeormColumn({ nullable: true })
	discountType?: ENUM_DISCOUNT_TYPE;

	@TypeormColumn({ type: 'float', nullable: true })
	discountValue?: number;

	@TypeormColumn({ type: 'float', nullable: true })
	discountedPrice?: number;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => TicketGroupTypeormEntity)
	ticketGroup?: TicketGroupTypeormEntity;

	@TypeormManyToOne(() => TicketInfoTypeormEntity)
	ticketInfo?: TicketInfoTypeormEntity;

	@TypeormManyToOne(() => OrderTypeormEntity, undefined, { nullable: true })
	order?: OrderTypeormEntity;

	@TypeormManyToOne(() => CustomerTypeormEntity, undefined, { nullable: true })
	customer?: CustomerTypeormEntity;
}
