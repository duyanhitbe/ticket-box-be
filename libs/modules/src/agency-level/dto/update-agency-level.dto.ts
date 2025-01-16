import { PartialType } from '@nestjs/swagger';
import { CreateAgencyLevelDto } from './create-agency-level.dto';

export class UpdateAgencyLevelDto extends PartialType(CreateAgencyLevelDto) {}
