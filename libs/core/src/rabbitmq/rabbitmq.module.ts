import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Env } from '@lib/common/interfaces';
import { RabbitMQModuleOptions } from '@lib/core/rabbitmq/rabbitmq.type';

@Module({})
export class RabbitMQModule {
	static register(options: RabbitMQModuleOptions[]): DynamicModule {
		return {
			module: RabbitMQModule,
			global: true,
			imports: [
				ClientsModule.registerAsync(
					options.map(({ name, queue }) => ({
						name,
						inject: [ConfigService],
						useFactory: (configService: ConfigService<Env>) => ({
							transport: Transport.RMQ,
							options: {
								urls: [configService.get('RABBIT_MQ_URL') as string],
								queue,
								queueOptions: {
									durable: true
								}
							}
						})
					}))
				)
			],
			exports: [ClientsModule]
		};
	}
}
