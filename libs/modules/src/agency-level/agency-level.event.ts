export const AGENCY_LEVEL_EVENTS = {
	CREATED: 'AGENCY_LEVEL_CREATED',
	DELETED: 'AGENCY_LEVEL_DELETED'
};

export type AgencyLevelCreatedPayload = {
	agencyLevelId: string;
};

export type AgencyLevelDeletedPayload = {
	agencyLevelId: string;
};
