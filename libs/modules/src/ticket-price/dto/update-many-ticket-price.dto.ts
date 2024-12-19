import { UpdateTicketPriceDto } from './update-ticket-price.dto';
import {
	I18nIsArray,
	I18nIsNotEmpty,
	I18nIsString,
	Property,
	SwaggerProperty
} from '@lib/common/decorators';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateManyTicketPriceDataDto extends UpdateTicketPriceDto {
	/**
	 * Mã giá vé
	 */
	@I18nIsString()
	@I18nIsNotEmpty()
	@SwaggerProperty({ description: 'Mã giá vé' })
	@Property('Mã giá vé')
	id!: string;
}

export class UpdateManyTicketPriceDto {
	@I18nIsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateManyTicketPriceDataDto)
	@SwaggerProperty({ type: [UpdateManyTicketPriceDataDto] })
	data!: UpdateManyTicketPriceDataDto[];
}
