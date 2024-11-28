import { Module } from '@nestjs/common';
import { CustomerRoleController } from './customer-role.controller';
import { CreateCustomerRoleUseCase } from './usecases/create-customer-role.usecase';
import { UpdateCustomerRoleUseCase } from './usecases/update-customer-role.usecase';
import { DeleteCustomerRoleUseCase } from './usecases/delete-customer-role.usecase';
import { FindCustomerRoleUseCase } from './usecases/find-customer-role.usecase';
import { DetailCustomerRoleUseCase } from './usecases/detail-customer-role.usecase';

@Module({
	controllers: [CustomerRoleController],
	providers: [
		CreateCustomerRoleUseCase,
		UpdateCustomerRoleUseCase,
		DeleteCustomerRoleUseCase,
		FindCustomerRoleUseCase,
		DetailCustomerRoleUseCase
	]
})
export class CustomerRoleModule {}
