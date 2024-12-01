import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketInfoDto } from './create-ticket-info.dto';

export class UpdateTicketInfoDto extends PartialType(
	OmitType(CreateTicketInfoDto, ['ticketGroupId', 'quantity'])
) {}
