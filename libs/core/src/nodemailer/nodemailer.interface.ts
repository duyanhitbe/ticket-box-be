export interface SendMailOrderOptions {
	to: string;
	customerName: string;
	orderCode: string;
	totalPrice: number;
	details: {
		name: string;
		quantity: number;
		price: number;
		totalPrice: number;
	}[];
}
