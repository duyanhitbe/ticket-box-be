import { PartialType } from '@nestjs/swagger';
import { CreateCustomerRoleDto } from './create-customer-role.dto';

export class UpdateCustomerRoleDto extends PartialType(CreateCustomerRoleDto) {}
