import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterDto {
	@ApiProperty({ required: false })
	limit?: string;

	@ApiProperty({ required: false })
	page?: string;
}
