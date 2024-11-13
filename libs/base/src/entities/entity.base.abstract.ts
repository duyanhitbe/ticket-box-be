import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
	@ApiProperty()
	id!: string;

	@ApiProperty()
	createdAt!: Date;

	@ApiProperty()
	updatedAt!: Date;

	@ApiProperty()
	deletedAt!: Date;
}
