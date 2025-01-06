export interface SendMailOrderSuccessOptions {
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

export interface SendMailOrderFailOptions {
	to: string;
	customerName: string;
	orderCode: string;
	reason: string;
}
