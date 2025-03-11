import { Injectable } from '@nestjs/common';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class ProcessPaymentOrderUseCase extends ExecuteHandler {
	constructor() {
		super();
	}

	async execute(data: any) {
		this.logger.debug(data);
	}
}
