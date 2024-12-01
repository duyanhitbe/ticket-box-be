export const TICKET_GROUP_EVENTS = {
	CREATED: 'TICKET_GROUP_CREATED',
	UPDATED: 'TICKET_GROUP_UPDATED'
};

export type TicketGroupCreatedPayload = {
	ticketGroupId: string;
	eventId: string;
	dates: Date[];
};

export type TicketGroupUpdatedPayload = {
	ticketGroupId: string;
	eventId: string;
	dates: Date[];
};
