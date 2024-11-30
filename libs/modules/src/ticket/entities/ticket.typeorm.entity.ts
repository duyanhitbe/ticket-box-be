import { TicketEntity } from './ticket.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';
import { CustomerTypeormEntity } from '@lib/modules/customer';
import { EventTypeormEntity } from '@lib/modules/event';
import { OrderTypeormEntity } from '@lib/modules/order';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';
import { TicketInfoTypeormEntity } from '@lib/modules/ticket-info';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';

@Entity('tickets')
export class TicketTypeormEntity extends BaseTypeormEntity implements TicketEntity {
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	ticketGroupId!: string;

	@TypeormColumn()
	ticketInfoId!: string;

	@TypeormColumn()
	orderId!: string;

	@TypeormColumn()
	customerId!: string;

	@TypeormColumn()
	code!: string;

	@TypeormColumn({ nullable: true })
	useAt?: Date;

	@TypeormColumn()
	expiresAt!: Date;

	@TypeormColumn({ nullable: true })
	basePrice?: number;

	@TypeormColumn({ nullable: true })
	discountType?: ENUM_DISCOUNT_TYPE;

	@TypeormColumn({ nullable: true })
	discountValue?: number;

	@TypeormColumn({ nullable: true })
	discountedPrice?: number;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => TicketGroupTypeormEntity)
	ticketGroup?: TicketGroupTypeormEntity;

	@TypeormManyToOne(() => TicketInfoTypeormEntity)
	ticketInfo?: TicketInfoTypeormEntity;

	@TypeormManyToOne(() => OrderTypeormEntity)
	order?: OrderTypeormEntity;

	@TypeormManyToOne(() => CustomerTypeormEntity)
	customer?: CustomerTypeormEntity;
}
