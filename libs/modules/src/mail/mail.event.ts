import { ENUM_ORDER_STATUS } from '../order';

export type SendMailOrderEventPayload = {
	customerName: string;
	customerEmail: string;
	orderCode: string;
	orderStatus: ENUM_ORDER_STATUS;
	totalPrice?: number;
	details?: {
		name: string;
		quantity: number;
		price: number;
		totalPrice: number;
	}[];
	reason?: string;
};
