export const TICKET_INFO_EVENTS = {
	CREATED: 'TICKET_INFO_CREATED'
};

export type TicketInfoCreatedPayload = {
	/**
	 * Mã thông tin vé
	 */
	ticketInfoId: string;
	/**
	 * Số lượng
	 */
	quantity: number;
};
