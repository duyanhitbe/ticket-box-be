import { config } from 'dotenv';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmLogger } from '@lib/core/logger';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Initial1732946728321 } from '@lib/core/typeorm/migrations/1732946728321-initial';
import { CreateUser1733021046881 } from '@lib/core/typeorm/migrations/1733021046881-create-user';
import { TicketGroup1733024125523 } from '@lib/core/typeorm/migrations/1733024125523-ticket-group';
import { Event1733025607907 } from '@lib/core/typeorm/migrations/1733025607907-event';
import { CustomerRole1733033544358 } from '@lib/core/typeorm/migrations/1733033544358-customer-role';
import { CreateCustomerRole1733033714090 } from '@lib/core/typeorm/migrations/1733033714090-create-customer-role';
import { UpdateFloat1733035105344 } from '@lib/core/typeorm/migrations/1733035105344-update-float';
import { SealCustomerRole1733036829839 } from '@lib/core/typeorm/migrations/1733036829839-seal-customer-role';
import { TicketGroupDate1733060760460 } from '@lib/core/typeorm/migrations/1733060760460-ticket-group-date';
import { RenameTable1733111751522 } from '@lib/core/typeorm/migrations/1733111751522-rename-table';
import { Customer1733303509465 } from '@lib/core/typeorm/migrations/1733303509465-customer';
import { TicketInfo1733318791744 } from '@lib/core/typeorm/migrations/1733318791744-ticket-info';
import { Order1733373959361 } from '@lib/core/typeorm/migrations/1733373959361-order';
import { OrderDetail1733403998536 } from '@lib/core/typeorm/migrations/1733403998536-order-detail';

config();
const configService = new ConfigService();

export const options: TypeOrmModuleOptions = {
	type: 'postgres',
	host: configService.get('POSTGRES_HOST'),
	port: +configService.get('POSTGRES_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	autoLoadEntities: true,
	synchronize: false,
	logger: new TypeOrmLogger(),
	migrationsTableName: 'migrations',
	migrationsRun: configService.get('TYPEORM_MIGRATION_RUN') === 'true',
	migrationsTransactionMode: 'each',
	migrations: [
		Initial1732946728321,
		CreateUser1733021046881,
		TicketGroup1733024125523,
		Event1733025607907,
		CustomerRole1733033544358,
		CreateCustomerRole1733033714090,
		UpdateFloat1733035105344,
		SealCustomerRole1733036829839,
		TicketGroupDate1733060760460,
		RenameTable1733111751522,
		Customer1733303509465,
		TicketInfo1733318791744,
		Order1733373959361,
		OrderDetail1733403998536
	]
};

export default new DataSource({
	...options,
	entities: ['**/*.typeorm.entity.ts']
} as any);
