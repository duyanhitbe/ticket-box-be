import { BaseEntity } from '@lib/base/entities';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export abstract class UserEntity extends BaseEntity {
	@ApiProperty()
	username!: string;

	@ApiHideProperty()
	password!: string;
}
