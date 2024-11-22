import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtServiceImp } from './jwt.service';
import { JwtService } from './jwt.abstract';

@Module({})
export class JwtModule {
	static forRoot(): DynamicModule {
		return {
			module: JwtModule,
			global: true,
			imports: [
				NestJwtModule.register({
					global: true
				})
			],
			providers: [
				{
					provide: JwtService,
					useClass: JwtServiceImp
				}
			],
			exports: [JwtService]
		};
	}
}
