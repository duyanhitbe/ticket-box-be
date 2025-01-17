import { Injectable } from '@nestjs/common';
import {
	AGENCY_LEVEL_EVENTS,
	AgencyLevelDeletedPayload,
	AgencyLevelEntity,
	AgencyLevelRepository
} from '@lib/modules/agency-level';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventEmitterService } from '@lib/core/event';

@Injectable()
export class DeleteAgencyLevelUseCase extends ExecuteHandler<AgencyLevelEntity> {
	constructor(
		private readonly agencyLevelRepository: AgencyLevelRepository,
		private readonly eventEmitterService: EventEmitterService
	) {
		super();
	}

	async execute(id: string): Promise<AgencyLevelEntity> {
		try {
			return this.agencyLevelRepository.softDeleteById({ id });
		} finally {
			const payload: AgencyLevelDeletedPayload = {
				agencyLevelId: id
			};
			this.eventEmitterService.emit(AGENCY_LEVEL_EVENTS.DELETED, payload);
		}
	}
}
