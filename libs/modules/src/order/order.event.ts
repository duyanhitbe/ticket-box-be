import { CreateOrderDto } from '@lib/modules/order/dto/create-order.dto';
import { RequestUser } from '@lib/common/interfaces';

export type CreateOrderEventPayload = CreateOrderDto & {
	orderId: string;
	user?: RequestUser;
};
