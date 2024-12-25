import { ENUM_EVENT_TYPE } from './event.enum';

export const EventType: Record<ENUM_EVENT_TYPE, string> = {
	[ENUM_EVENT_TYPE.EVENT]: 'Sự kiện nổi bật',
	[ENUM_EVENT_TYPE.PARK]: 'Công viên',
	[ENUM_EVENT_TYPE.VOUCHER]: 'Voucher',
	[ENUM_EVENT_TYPE.OTHER]: 'Khác'
};
