export type SendMailOrderSuccessEventPayload = {
	customerName: string;
	customerEmail: string;
	orderCode: string;
	totalPrice: number;
	details: {
		name: string;
		quantity: number;
		price: number;
		totalPrice: number;
	}[];
};
