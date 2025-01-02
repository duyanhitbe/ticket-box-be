import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CreateCustomerUseCase } from './usecases/create-customer.usecase';
import { UpdateCustomerUseCase } from './usecases/update-customer.usecase';
import { DeleteCustomerUseCase } from './usecases/delete-customer.usecase';
import { FindCustomerUseCase } from './usecases/find-customer.usecase';
import { DetailCustomerUseCase } from './usecases/detail-customer.usecase';

@Module({
	controllers: [CustomerController],
	providers: [
		CreateCustomerUseCase,
		UpdateCustomerUseCase,
		DeleteCustomerUseCase,
		FindCustomerUseCase,
		DetailCustomerUseCase
	],
	exports: [DetailCustomerUseCase]
})
export class CustomerModule {}
