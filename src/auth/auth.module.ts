import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { LoginCustomerUseCase } from './usecases/login-customer.usecase';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';
import { LoginUseCase } from './usecases/login.usecase';
import { LoginAgencyUseCase } from './usecases/login-agency.usecase';

@Module({
	imports: [CustomerModule, UserModule],
	controllers: [AuthController],
	providers: [LoginUserUseCase, LoginCustomerUseCase, LoginUseCase, LoginAgencyUseCase]
})
export class AuthModule {}
