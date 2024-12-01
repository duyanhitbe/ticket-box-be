export const TICKET_INFO_EVENTS = {
	CREATED: 'CREATED'
};

export type TicketInfoCreatedPayload = {
	/**
	 * Mã thông tin vé
	 */
	ticketInfoId: string;
};
