import { Injectable } from '@nestjs/common';
import {
	CreateCustomerRoleDto,
	CustomerRoleEntity,
	CustomerRoleRepository
} from '@lib/modules/customer-role';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
	CUSTOMER_ROLE_EVENTS,
	CustomerRoleCreatedPayload
} from '@lib/modules/customer-role/customer-role.event';

@Injectable()
export class CreateCustomerRoleUseCase extends ExecuteHandler<CustomerRoleEntity> {
	constructor(
		private readonly customerRoleRepository: CustomerRoleRepository,
		private readonly eventEmitter: EventEmitter2
	) {
		super();
	}

	async execute(data: CreateCustomerRoleDto): Promise<CustomerRoleEntity> {
		let customerRoleId = '';
		try {
			const customerRole = await this.customerRoleRepository.create({ data });
			customerRoleId = customerRole.id;
			return customerRole;
		} finally {
			const payload: CustomerRoleCreatedPayload = {
				customerRoleId
			};
			this.eventEmitter.emit(CUSTOMER_ROLE_EVENTS.CREATED, payload);
		}
	}
}
