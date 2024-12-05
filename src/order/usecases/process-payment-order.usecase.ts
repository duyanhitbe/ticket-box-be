import { Injectable } from '@nestjs/common';
import { ExecuteHandler } from '@lib/common/abstracts';

@Injectable()
export class ProcessPaymentOrderUseCase extends ExecuteHandler<any> {
	constructor() {
		super();
	}

	async execute(data: any) {
		console.log(data);
	}
}
