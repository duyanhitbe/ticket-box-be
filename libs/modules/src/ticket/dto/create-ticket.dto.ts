import { Property, SwaggerProperty } from '@lib/common/decorators';

export class CreateTicketDto {
	/**
	 * Mã thông tin vé
	 */
	@SwaggerProperty()
	@Property('Mã thông tin vé')
	ticketInfoId!: string;
}
