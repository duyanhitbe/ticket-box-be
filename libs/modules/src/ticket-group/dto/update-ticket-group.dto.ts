import { PartialType } from '@nestjs/swagger';
import { CreateTicketGroupDto } from './create-ticket-group.dto';

export class UpdateTicketGroupDto extends PartialType(CreateTicketGroupDto) {}
