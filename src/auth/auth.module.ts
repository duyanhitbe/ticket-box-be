import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUserUseCase } from './usecases/login-user.usecase';

@Module({
	controllers: [AuthController],
	providers: [LoginUserUseCase]
})
export class AuthModule {}
