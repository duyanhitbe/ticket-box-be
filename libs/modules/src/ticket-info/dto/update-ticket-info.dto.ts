import { PartialType } from '@nestjs/swagger';
import { CreateTicketInfoDto } from './create-ticket-info.dto';

export class UpdateTicketInfoDto extends PartialType(CreateTicketInfoDto) {}
