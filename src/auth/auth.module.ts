import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginCustomerUseCase } from './usecases/login-customer.usecase';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';
import { LoginUseCase } from './usecases/login.usecase';
import { RegisterCustomerUseCase } from './usecases/register-customer.usecase';

@Module({
	imports: [CustomerModule, UserModule],
	controllers: [AuthController],
	providers: [LoginCustomerUseCase, LoginUseCase, RegisterCustomerUseCase]
})
export class AuthModule {}
