import { Module } from '@nestjs/common';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { UserRepository, UserTypeormEntity, UserTypeormRepository } from '@lib/modules/user';
import { EventRepository, EventTypeormEntity, EventTypeormRepository } from '@lib/modules/event';
import {
	CustomerRepository,
	CustomerTypeormEntity,
	CustomerTypeormRepository
} from '@lib/modules/customer';
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
import {
	TicketGroupDateRepository,
	TicketGroupDateTypeormEntity,
	TicketGroupDateTypeormRepository
} from '@lib/modules/ticket-group-date';
import {
	AgencyLevelRepository,
	AgencyLevelTypeormEntity,
	AgencyLevelTypeormRepository
} from '@lib/modules/agency-level';
import {
	AgencyRepository,
	AgencyTypeormEntity,
	AgencyTypeormRepository
} from '@lib/modules/agency';
import { AgencyUserRepository, AgencyUserTypeormRepository } from '@lib/modules/agency-user';
import { NewsRepository, NewsTypeormEntity, NewsTypeormRepository } from '@lib/modules/news';

@Module({
	imports: [
		TypeormModule.forFeatures({
			entities: [
				CustomerTypeormEntity,
				EventTypeormEntity,
				OrderTypeormEntity,
				OrderDetailTypeormEntity,
				TicketTypeormEntity,
				TicketGroupTypeormEntity,
				TicketGroupDateTypeormEntity,
				TicketInfoTypeormEntity,
				TicketPriceTypeormEntity,
				UserTypeormEntity,
				AgencyLevelTypeormEntity,
				AgencyTypeormEntity,
				NewsTypeormEntity
			],
			repositories: [
				{
					provide: CustomerRepository,
					useClass: CustomerTypeormRepository
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
					provide: TicketGroupDateRepository,
					useClass: TicketGroupDateTypeormRepository
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
				},
				{
					provide: AgencyLevelRepository,
					useClass: AgencyLevelTypeormRepository
				},
				{
					provide: AgencyRepository,
					useClass: AgencyTypeormRepository
				},
				{
					provide: AgencyUserRepository,
					useClass: AgencyUserTypeormRepository
				},
				{
					provide: NewsRepository,
					useClass: NewsTypeormRepository
				}
			]
		})
	]
})
export class AppRepositoryModule {}
