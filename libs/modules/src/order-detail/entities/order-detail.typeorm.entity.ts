import { OrderDetailEntity } from './order-detail.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { Entity } from 'typeorm';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';
import { OrderTypeormEntity } from '@lib/modules/order';
import { TicketGroupTypeormEntity } from '@lib/modules/ticket-group';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';

@Entity('order_details')
export class OrderDetailTypeormEntity extends BaseTypeormEntity implements OrderDetailEntity {
	@TypeormColumn()
	orderId!: string;

	@TypeormColumn()
	ticketGroupId!: string;

	@TypeormColumn()
	ticketName!: string;

	@TypeormColumn({ type: 'float' })
	ticketBasePrice!: number;

	@TypeormColumn({ nullable: true })
	ticketDiscountType?: ENUM_DISCOUNT_TYPE;

	@TypeormColumn({ type: 'float', nullable: true })
	ticketDiscountValue?: number;

	@TypeormColumn({ type: 'float' })
	ticketDiscountedPrice!: number;

	@TypeormColumn()
	quantity!: number;

	@TypeormColumn({ type: 'float' })
	totalPrice!: number;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => OrderTypeormEntity)
	order?: OrderTypeormEntity;

	@TypeormManyToOne(() => TicketGroupTypeormEntity)
	ticketGroup?: TicketGroupTypeormEntity;
}
