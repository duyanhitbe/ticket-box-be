export const CUSTOMER_ROLE_EVENTS = {
	CREATED: 'CUSTOMER_ROLE_CREATED',
	DELETED: 'CUSTOMER_ROLE_DELETED'
};

export type CustomerRoleCreatedPayload = {
	customerRoleId: string;
};

export type CustomerRoleDeletedPayload = {
	customerRoleId: string;
};
