import { PartialType } from '@nestjs/swagger';
import { CreateAgencyUserDto } from './create-agency-user.dto';

export class UpdateAgencyUserDto extends PartialType(CreateAgencyUserDto) {}
