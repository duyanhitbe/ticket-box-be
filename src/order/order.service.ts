import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrderService {
	private readonly logger = new Logger(this.constructor.name);
}
