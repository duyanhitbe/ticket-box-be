import { Module } from '@nestjs/common';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { UserRepository, UserTypeormEntity, UserTypeormRepository } from '@lib/modules/user';
import { EventRepository, EventTypeormEntity, EventTypeormRepository } from '@lib/modules/event';
import {
	CustomerRepository,
	CustomerTypeormEntity,
	CustomerTypeormRepository
} from '@lib/modules/customer';
import {
	CustomerRoleRepository,
	CustomerRoleTypeormEntity,
	CustomerRoleTypeormRepository
} from '@lib/modules/customer-role';
import { OrderRepository, OrderTypeormEntity, OrderTypeormRepository } from '@lib/modules/order';
import {
	OrderDetailRepository,
	OrderDetailTypeormEntity,
	OrderDetailTypeormRepository
} from '@lib/modules/order-detail';
import {
	TicketRepository,
	TicketTypeormEntity,
	TicketTypeormRepository
} from '@lib/modules/ticket';
import {
	TicketGroupRepository,
	TicketGroupTypeormEntity,
	TicketGroupTypeormRepository
} from '@lib/modules/ticket-group';
import {
	TicketInfoRepository,
	TicketInfoTypeormEntity,
	TicketInfoTypeormRepository
} from '@lib/modules/ticket-info';
import {
	TicketPriceRepository,
	TicketPriceTypeormEntity,
	TicketPriceTypeormRepository
} from '@lib/modules/ticket-price';

@Module({
	imports: [
		TypeormModule.forFeatures({
			entities: [
				CustomerTypeormEntity,
				CustomerRoleTypeormEntity,
				EventTypeormEntity,
				OrderTypeormEntity,
				OrderDetailTypeormEntity,
				TicketTypeormEntity,
				TicketGroupTypeormEntity,
				TicketInfoTypeormEntity,
				TicketPriceTypeormEntity,
				UserTypeormEntity
			],
			repositories: [
				{
					provide: CustomerRepository,
					useClass: CustomerTypeormRepository
				},
				{
					provide: CustomerRoleRepository,
					useClass: CustomerRoleTypeormRepository
				},
				{
					provide: EventRepository,
					useClass: EventTypeormRepository
				},
				{
					provide: OrderRepository,
					useClass: OrderTypeormRepository
				},
				{
					provide: OrderDetailRepository,
					useClass: OrderDetailTypeormRepository
				},
				{
					provide: TicketRepository,
					useClass: TicketTypeormRepository
				},
				{
					provide: TicketGroupRepository,
					useClass: TicketGroupTypeormRepository
				},
				{
					provide: TicketInfoRepository,
					useClass: TicketInfoTypeormRepository
				},
				{
					provide: TicketPriceRepository,
					useClass: TicketPriceTypeormRepository
				},
				{
					provide: UserRepository,
					useClass: UserTypeormRepository
				}
			]
		})
	]
})
export class AppRepositoryModule {}
