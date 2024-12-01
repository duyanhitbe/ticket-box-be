import { PartialType } from '@nestjs/swagger';
import { CreateTicketGroupDateDto } from './create-ticket-group-date.dto';

export class UpdateTicketGroupDateDto extends PartialType(CreateTicketGroupDateDto) {}
