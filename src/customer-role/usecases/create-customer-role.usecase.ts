import { Injectable } from '@nestjs/common';
import {
	CreateCustomerRoleDto,
	CustomerRoleEntity,
	CustomerRoleRepository
} from '@lib/modules/customer-role';
import { ExecuteHandler } from '@lib/common/abstracts';
import {
	CUSTOMER_ROLE_EVENTS,
	CustomerRoleCreatedPayload
} from '@lib/modules/customer-role/customer-role.event';
import { EventEmitterService } from '@lib/core/event';

@Injectable()
export class CreateCustomerRoleUseCase extends ExecuteHandler<CustomerRoleEntity> {
	constructor(
		private readonly customerRoleRepository: CustomerRoleRepository,
		private readonly eventEmitterService: EventEmitterService
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
			this.eventEmitterService.emit(CUSTOMER_ROLE_EVENTS.CREATED, payload);
		}
	}
}
