import { OrderRepository } from './order.repository.abstract';
import { BaseTypeormRepository } from '@lib/base/repositories';
import { Repository } from '@lib/core/typeorm';
import { OrderTypeormEntity } from '../entities/order.typeorm.entity';
import { CreateOptions } from '@lib/base/types';
import { getMeta, getPageLimitOffset, randomString } from '@lib/common/helpers';
import { PaginationResponse } from '@lib/base/dto';
import { FilterOrderDto } from '@lib/modules/order';
import { Brackets } from 'typeorm';

@Repository(OrderTypeormEntity)
export class OrderTypeormRepository
	extends BaseTypeormRepository<OrderTypeormEntity>
	implements OrderRepository
{
	async create(options: CreateOptions<OrderTypeormEntity>): Promise<OrderTypeormEntity> {
		options.data.code = await this.getCode();
		return super.create(options);
	}

	private async getCode(): Promise<string> {
		const code = randomString(10);
		const exist = await this.exists({
			where: {
				code
			}
		});
		if (exist) return this.getCode();
		return code;
	}

	async updateOrderById(id: string, data: Partial<OrderTypeormEntity>): Promise<void> {
		await this.repository.update(id, data);
	}

	async findPaginated(filter: FilterOrderDto): Promise<PaginationResponse<OrderTypeormEntity>> {
		const { eventId, customerId, orderStatus, paymentMethod, search } = filter;
		const { limit, offset } = getPageLimitOffset(filter);

		const queryBuilder = this.repository
			.createQueryBuilder('order')
			.select([
				'order.id AS "id"',
				'order.created_at AS "createdAt"',
				'order.updated_at AS "updatedAt"',
				'order.deleted_at AS "deletedAt"',
				'order.event_id AS "eventId"',
				'order.customer_id AS "customerId"',
				'order.code AS "code"',
				'order.event_name AS "eventName"',
				'order.customer_name AS "customerName"',
				'order.customer_phone AS "customerPhone"',
				'order.customer_email AS "customerEmail"',
				'order.payment_method AS "paymentMethod"',
				'order.total_price AS "totalPrice"',
				'order.order_status AS "orderStatus"',
				'order.reason AS "reason"'
			]);

		if (eventId) {
			queryBuilder.where('event_id = :eventId', { eventId });
		}

		if (customerId) {
			queryBuilder.where('customer_id = :customerId', { customerId });
		}

		if (orderStatus) {
			queryBuilder.where('order_status = :orderStatus', { orderStatus });
		}

		if (paymentMethod) {
			queryBuilder.where('payment_method = :paymentMethod', { paymentMethod });
		}

		if (search) {
			const searchFields = ['customer_name', 'customer_phone', 'customer_email', 'code'];
			queryBuilder.andWhere(
				new Brackets((qb) => {
					searchFields.forEach((field) => {
						qb.orWhere(`order.${field} ILIKE '%${search}%'`);
					});
				})
			);
		}

		const [data, count] = await Promise.all([
			queryBuilder.limit(limit).offset(offset).getRawMany(),
			queryBuilder.getCount()
		]);

		const meta = getMeta(filter, count);

		return {
			data,
			meta
		};
	}
}
