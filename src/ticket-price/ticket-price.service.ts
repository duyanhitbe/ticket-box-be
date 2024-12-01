import { Injectable } from '@nestjs/common';
import { ENUM_DISCOUNT_TYPE } from '@lib/modules/common';

@Injectable()
export class TicketPriceService {
	calculateDiscountedPrice(
		basePrice: number,
		discountType?: ENUM_DISCOUNT_TYPE,
		discountValue?: number
	) {
		if (discountType && discountValue) {
			switch (discountType) {
				case ENUM_DISCOUNT_TYPE.FIXED:
					if (basePrice < discountValue) {
						return 0;
					}

					return basePrice - discountValue;
				case ENUM_DISCOUNT_TYPE.PERCENTAGE:
					if (discountValue > 100) {
						return 0;
					}

					return basePrice * ((100 - discountValue) / 100);
			}
		}

		return basePrice;
	}
}
