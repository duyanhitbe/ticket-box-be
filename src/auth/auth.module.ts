import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { LoginCustomerUseCase } from './usecases/login-customer.usecase';

@Module({
	controllers: [AuthController],
	providers: [LoginUserUseCase, LoginCustomerUseCase]
})
export class AuthModule {}
