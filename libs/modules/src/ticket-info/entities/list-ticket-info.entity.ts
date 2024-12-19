import { TicketInfoEntity } from '@lib/modules/ticket-info';
import { Property, SwaggerProperty } from '@lib/common/decorators';

export class ListTicketInfoEntity extends TicketInfoEntity {
	/**
	 * Tên sự kiện
	 */
	@SwaggerProperty()
	@Property('Tên sự kiện')
	eventName!: string;

	/**
	 * Tên nhóm vé
	 */
	@SwaggerProperty()
	@Property('Tên nhóm vé')
	ticketGroupName!: string;
}
