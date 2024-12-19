import { CreateOrderDto } from '@lib/modules/order';
import { RequestUser } from '@lib/common/interfaces';

export type CreateOrderEventPayload = CreateOrderDto & {
	orderId: string;
	user?: RequestUser;
};
