import { Injectable } from '@nestjs/common';
import { CustomerRoleEntity, CustomerRoleRepository } from '@lib/modules/customer-role';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
	CUSTOMER_ROLE_EVENTS,
	CustomerRoleDeletedPayload
} from '@lib/modules/customer-role/customer-role.event';

@Injectable()
export class DeleteCustomerRoleUseCase extends ExecuteHandler<CustomerRoleEntity> {
	constructor(
		private readonly customerRoleRepository: CustomerRoleRepository,
		private readonly eventEmitter: EventEmitter2
	) {
		super();
	}

	async execute(id: string): Promise<CustomerRoleEntity> {
		try {
			return this.customerRoleRepository.softDeleteById({ id });
		} finally {
			const payload: CustomerRoleDeletedPayload = {
				customerRoleId: id
			};
			this.eventEmitter.emit(CUSTOMER_ROLE_EVENTS.DELETED, payload);
		}
	}
}
