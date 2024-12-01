import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketPriceDto } from './create-ticket-price.dto';

export class UpdateTicketPriceDto extends PartialType(
	OmitType(CreateTicketPriceDto, ['ticketInfoId', 'customerRoleId'])
) {}
