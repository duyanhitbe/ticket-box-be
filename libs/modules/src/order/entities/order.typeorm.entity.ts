import { OrderEntity } from './order.entity.abstract';
import { BaseTypeormEntity } from '@lib/base/entities';
import { CustomerTypeormEntity } from '@lib/modules/customer';
import { EventTypeormEntity } from '@lib/modules/event';
import { Entity } from 'typeorm';
import { ENUM_ORDER_STATUS, ENUM_PAYMENT_METHOD } from '../order.enum';
import { TypeormColumn, TypeormManyToOne } from '@lib/common/decorators';

@Entity('orders')
export class OrderTypeormEntity extends BaseTypeormEntity implements OrderEntity {
	@TypeormColumn()
	eventId!: string;

	@TypeormColumn()
	customerId!: string;

	@TypeormColumn()
	code!: string;

	@TypeormColumn()
	note?: string;

	@TypeormColumn()
	eventName!: string;

	@TypeormColumn()
	customerName!: string;

	@TypeormColumn()
	customerPhone!: string;

	@TypeormColumn()
	customerEmail!: string;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_PAYMENT_METHOD,
		enumName: 'ENUM_PAYMENT_METHOD'
	})
	paymentMethod!: ENUM_PAYMENT_METHOD;

	@TypeormColumn()
	cardId!: string;

	@TypeormColumn()
	cardName!: string;

	@TypeormColumn()
	totalPrice!: number;

	@TypeormColumn({
		type: 'simple-enum',
		enum: ENUM_ORDER_STATUS,
		enumName: 'ENUM_ORDER_STATUS'
	})
	orderStatus!: ENUM_ORDER_STATUS;

	/* ========== Relations ========== */

	@TypeormManyToOne(() => EventTypeormEntity)
	event?: EventTypeormEntity;

	@TypeormManyToOne(() => CustomerTypeormEntity)
	customer?: CustomerTypeormEntity;
}
