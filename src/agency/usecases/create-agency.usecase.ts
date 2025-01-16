import { Injectable } from '@nestjs/common';
import { AgencyEntity, AgencyRepository, CreateAgencyDto } from '@lib/modules/agency';
import { ExecuteHandler } from '@lib/common/abstracts';
import { EventRepository } from '@lib/modules/event';

@Injectable()
export class CreateAgencyUseCase extends ExecuteHandler<AgencyEntity> {
	constructor(
		private readonly agencyRepository: AgencyRepository,
		private readonly eventRepository: EventRepository
	) {
		super();
	}

	async execute(data: CreateAgencyDto): Promise<AgencyEntity> {
		const { eventIds, ...rest } = data;

		const events = await Promise.all(
			eventIds.map(async (eventId) =>
				this.eventRepository.findByIdOrThrow({
					id: eventId
				})
			)
		);

		return this.agencyRepository.create({
			data: {
				...rest,
				events
			}
		});
	}
}
