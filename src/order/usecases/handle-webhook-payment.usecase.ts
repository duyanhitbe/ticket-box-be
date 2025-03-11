import { Injectable } from '@nestjs/common';
import { ExecuteHandler } from '@lib/common/abstracts';
import { ENUM_RABBITMQ_CLIENT, InjectClientRMQ, RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { RabbitmqService } from '@lib/core/rabbitmq/rabbitmq.service.abstract';

@Injectable()
export class HandleWebhookPaymentUseCase extends ExecuteHandler {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.ORDER)
		private readonly orderClient: RabbitmqService
	) {
		super();
	}

	execute() {
		this.orderClient.emit(RABBITMQ_PATTERNS.PROCESS_PAYMENT, {});
		return {};
	}
}
