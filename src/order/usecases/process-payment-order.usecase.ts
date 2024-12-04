import { Injectable } from '@nestjs/common';
import { ExecuteHandler } from '@lib/common/abstracts';
import {
	ENUM_RABBITMQ_CLIENT,
	InjectClientRMQ,
	RABBITMQ_PATTERNS,
	RMQClientProxy
} from '@lib/core/rabbitmq';

@Injectable()
export class ProcessPaymentOrderUseCase extends ExecuteHandler<any> {
	constructor(
		@InjectClientRMQ(ENUM_RABBITMQ_CLIENT.ORDER)
		private readonly orderClient: RMQClientProxy
	) {
		super();
	}

	execute() {
		this.orderClient.emit(RABBITMQ_PATTERNS.PROCESS_PAYMENT, {});
		return {};
	}
}
