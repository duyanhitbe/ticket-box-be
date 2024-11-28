import { PartialType } from '@nestjs/swagger';
import { CreateEventDateDto } from './create-event-date.dto';

export class UpdateEventDateDto extends PartialType(CreateEventDateDto) {}
