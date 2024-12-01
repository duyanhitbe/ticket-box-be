import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { EventModule } from './event/event.module';
import { TicketGroupModule } from './ticket-group/ticket-group.module';
import { TicketInfoModule } from './ticket-info/ticket-info.module';
import { TicketPriceModule } from './ticket-price/ticket-price.module';
import { TicketModule } from './ticket/ticket.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerRoleModule } from './customer-role/customer-role.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		MailModule,
		EventModule,
		TicketGroupModule,
		TicketInfoModule,
		TicketPriceModule,
		TicketModule,
		CustomerModule,
		CustomerRoleModule,
		OrderModule,
		OrderDetailModule
	]
})
export class AppTransportModule {}