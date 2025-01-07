import { OrderEntity } from './order.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { CustomerTypeormEntity } from '@lib/modules/customer';
import { EventTypeormEntity } from '@lib/modules/event';
import { Entity } from 'typeorm';
import { ENUM_ORDER_STATUS, ENUM_PAYMENT_METHOD } from '../order.enum';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';

@Entity('orders')
export class OrderTypeormEntity extends BaseTypeormEntity implements OrderEntity {
	@TypeormColumn({ nullable: true })
	eventId?: string;

	@TypeormColumn({ nullable: true })
	customerId?: string;

	@TypeormColumn()
	code!: string;

	@TypeormColumn({ nullable: true })
	note?: string;

	@TypeormColumn({ nullable: true })
	eventName?: string;

	@TypeormColumn({ nullable: true })
	customerName?: string;

	@TypeormColumn({ nullable: true })
	customerPhone?: string;

	@TypeormColumn({ nullable: true })
	customerEmail?: string;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_PAYMENT_METHOD,
		enumName: 'ENUM_PAYMENT_METHOD'
	})
	paymentMethod!: ENUM_PAYMENT_METHOD;

	@TypeormColumn({ type: 'float', nullable: true })
	totalPrice?: number;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_ORDER_STATUS,
		enumName: 'ENUM_ORDER_STATUS',
		nullable: true
	})
	orderStatus?: ENUM_ORDER_STATUS;

	/**
	 * Lí do
	 */
	@TypeormColumn({ nullable: true })
	reason?: string;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => CustomerTypeormEntity)
	customer?: CustomerTypeormEntity;
}
