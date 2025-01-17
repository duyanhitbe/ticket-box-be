import { Injectable } from '@nestjs/common';
import {
	AGENCY_LEVEL_EVENTS,
	AgencyLevelCreatedPayload,
	AgencyLevelEntity,
	AgencyLevelRepository,
	CreateAgencyLevelDto
} from '@lib/modules/agency-level';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventEmitterService } from '@lib/core/event';

@Injectable()
export class CreateAgencyLevelUseCase extends ExecuteHandler<AgencyLevelEntity> {
	constructor(
		private readonly agencyLevelRepository: AgencyLevelRepository,
		private readonly eventEmitterService: EventEmitterService
	) {
		super();
	}

	async execute(data: CreateAgencyLevelDto): Promise<AgencyLevelEntity> {
		let agencyLevelId = '';
		try {
			const agencyLevel = await this.agencyLevelRepository.create({ data });
			agencyLevelId = agencyLevel.id;
			return agencyLevel;
		} finally {
			const payload: AgencyLevelCreatedPayload = {
				agencyLevelId
			};
			this.eventEmitterService.emit(AGENCY_LEVEL_EVENTS.CREATED, payload);
		}
	}
}
