import { Module } from '@nestjs/common';
import { TypeormModule } from '@lib/core/typeorm/typeorm.module';
import { UserRepository, UserTypeormEntity, UserTypeormRepository } from '@lib/modules/user';
import { EventRepository, EventTypeormRepository } from '@lib/modules/event';
import { CustomerRepository, CustomerTypeormRepository } from '@lib/modules/customer';
import { CustomerRoleRepository, CustomerRoleTypeormRepository } from '@lib/modules/customer-role';
import { NewsRepository, NewsTypeormRepository } from '@lib/modules/news';
import { OrderRepository, OrderTypeormRepository } from '@lib/modules/order';
import { OrderDetailRepository, OrderDetailTypeormRepository } from '@lib/modules/order-detail';
import { TicketRepository, TicketTypeormRepository } from '@lib/modules/ticket';
import { TicketGroupRepository, TicketGroupTypeormRepository } from '@lib/modules/ticket-group';
import { TicketInfoRepository, TicketInfoTypeormRepository } from '@lib/modules/ticket-info';
import { TicketPriceRepository, TicketPriceTypeormRepository } from '@lib/modules/ticket-price';

@Module({
	imports: [
		TypeormModule.forFeatures({
			entities: [UserTypeormEntity],
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
					provide: NewsRepository,
					useClass: NewsTypeormRepository
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
